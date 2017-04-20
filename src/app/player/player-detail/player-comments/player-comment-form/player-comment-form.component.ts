import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {animate, state, style, transition, trigger } from '@angular/animations'
import {PlayerService} from "../../../../services/player.service";
import {TeamService} from "../../../../services/team.service";
import {PlayerCommentService} from "../../../../services/player-comment.service";
import {UserDataService} from "../../../../services/user-data.service";
import {Player} from "../../../../player";
import {PlayerComment} from "../../../../player-comment";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Auth} from "../../../../services/auth-service";


@Component({
  selector: 'player-comment-form',
  templateUrl: 'player-comment-form.component.html',
  styleUrls: ['player-comment-form.component.scss'],
  providers: [PlayerService, TeamService, PlayerCommentService, UserDataService ],
  animations: [
        trigger('cardemail', [
            state('*', style({
                '-ms-transform': 'translate3D(0px, 0px, 0px)',
                '-webkit-transform': 'translate3D(0px, 0px, 0px)',
                '-moz-transform': 'translate3D(0px, 0px, 0px)',
                '-o-transform':'translate3D(0px, 0px, 0px)',
                transform:'translate3D(0px, 0px, 0px)',
                opacity: 1})),
            transition('void => *', [
                style({opacity: 0,
                    '-ms-transform': 'translate3D(0px, 150px, 0px)',
                    '-webkit-transform': 'translate3D(0px, 150px, 0px)',
                    '-moz-transform': 'translate3D(0px, 150px, 0px)',
                    '-o-transform':'translate3D(0px, 150px, 0px)',
                    transform:'translate3D(0px, 150px, 0px)',
                }),
                animate('0.3s 0s ease-out')
            ])
        ]),
    ]
})
export class PlayerCommentFormComponent implements OnInit {

  /**
   * The player that will receive the comment
   */
  @Input() player: Player;
  @Input() commentReasons: string;
  @Output() onSaved: EventEmitter<PlayerComment> = new EventEmitter<PlayerComment>();

  model: PlayerComment = new PlayerComment();
  playerCommentSubmitted: boolean = false;
  playerCommentSubmitting: boolean = false;

  playerCommentForm = new FormGroup({
      comment: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(200)])),
      reason: new FormControl('', Validators.required)
  });

  constructor(
    public auth: Auth,
    private playerCommentService: PlayerCommentService
  ) {}

  ngOnInit(): void {
  }

  submitComment(): void {
      this.model.playerId = this.player.id;
      this.model.when = new Date();
      this.playerCommentSubmitting = true;
      this.playerCommentService.postNewPlayerComment(this.model).then(playerComment => {
          this.model = playerComment;
          this.playerCommentSubmitted = true;
          this.playerCommentSubmitting = false;
          this.onSaved.emit(playerComment);
      }).catch(error => {
          this.playerCommentSubmitted = false;
          this.playerCommentSubmitting = false;
      })
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
