import {Component, OnInit, Input}      from '@angular/core';
import {PlayerService} from "../../../services/player.service";
import {TeamService} from "../../../services/team.service";
import {PlayerCommentService} from "../../../services/player-comment.service";
import {Auth} from "../../../services/auth-service";
import {UserDataService} from "../../../services/user-data.service";
import {PlayerComment} from "../../../player-comment";
import {Player} from "../../../player";
import {UserData} from "../../../user-data";
import {UserService} from "../../../services/user.service";
import {User} from "../../../user";


@Component({
  selector: 'player-comments',
  templateUrl: 'player-comments.component.html',
  styleUrls: ['player-comments.component.scss'],
  providers: [PlayerService, TeamService, PlayerCommentService, UserService, UserDataService ]
})
export class PlayerCommentsComponent implements OnInit {

  @Input() player: Player;
  commentReasons: string[];

  private userAndComment: {[userId: string]: {user: any, playerComment: PlayerComment}} = {};
  commentsLoaded: boolean = false;

  userData: UserData;
  userDataLoaded: boolean = false;

  playerComment: PlayerComment = new PlayerComment();
  deleting: boolean = false;

  constructor(
    private auth: Auth,
    private playerCommentService: PlayerCommentService,
    private userService: UserService,
    private userDataService: UserDataService,
  ) {}

  ngOnInit(): void {
    this.playerCommentService.getCommentReasons().then(commentReasons => this.commentReasons = commentReasons).catch(error => console.log(error));

    this.playerCommentService.getPlayerComments(this.player.id).then(comments => {
        comments.forEach(comment => {
            this.userService.getUser(comment.userId).then(user => {
                this.userAndComment[comment.userId] = {user: user, playerComment: comment};
                this.commentsLoaded = Object.keys(this.userAndComment).length === comments.length;
            })
        });
        this.commentsLoaded = Object.keys(this.userAndComment).length === comments.length;
    }).catch(error => {
        this.commentsLoaded = true;
    });

    if (this.auth.authenticated()) {
        this.userDataService.getUserPlayerData().then(userData => {
            this.userData = userData;
            this.userDataLoaded = true;
        }).catch(error => {
            this.userDataLoaded = true;
        })
    }
  }

  isEverythingLoaded(): boolean {
      return this.commentsLoaded;
  }

  canUserWriteAComment(): boolean {

      let noPreviousComment: boolean = !this.userAndComment[this.auth.userProfile.user_id];
      return this.auth.authenticated() && !this.sameUser() && noPreviousComment;
  }

  getUserForUserId(userId: string): User {
      return this.userAndComment[userId].user;
  }

  sameUser(): boolean {
      return this.userData.playerId ? this.userData.playerId === this.player.id : false;
  }

  sameUserWhoWroteTheComment(user: User): boolean {
    return this.userData && this.userData.userId && this.auth.userProfile ? this.userData.userId === user.user_id : false;
  }

  onSaved(playerComment: PlayerComment): void {
    this.userAndComment[this.userData.userId] = {user: this.auth.userProfile, playerComment: playerComment};
  }

  onDeleted(playerComment: PlayerComment) {
      this.deleting = true;
      this.playerCommentService.deletePlayerComment(playerComment.id).then(res => {
          this.userAndComment[this.userData.userId] = null; // this works because I only allow one player comment per user
          this.deleting = false
      }).catch(error => {
          console.log("deleting comment error", error);
          this.deleting = false
      })
  }

  getComments(): PlayerComment[] {
      let values: {user: any, playerComment: PlayerComment}[] = this.values(this.userAndComment);
      return values.filter(entry => entry != null).map(entry => entry.playerComment);
  }

  private values<Y>(data: {[key: string]: Y}): Y[] {
      return Object.keys(data).map(key=>data[key])
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
