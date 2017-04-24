import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {PlayerToTeamSportDetails} from '../../../player-to-team-sport-details';
import {TeamSport} from '../../../team-sports';
import {TeamSportService} from '../../../services/sports-service';
import {Player} from '../../../player';
import {Auth} from '../../../services/auth-service';
import {UserDataService} from '../../../services/user-data.service';
import {UserData} from '../../../user-data';


@Component({
  selector: 'player-detail-team-sports',
  templateUrl: 'player-detail-team-sports.component.html',
  styleUrls: ['player-detail-team-sports.component.scss'],
  providers: [TeamSportService, UserDataService, Auth]
})
export class PlayerDetailTeamSportsComponent implements OnInit {
  @Input() playerToTeamSport: {[sport: string]: PlayerToTeamSportDetails};
  /**
   * To represent the player in the field
   * @type {Player}
  */
  @Input() player: Player = new Player();
  sports: {[sportName: string]: TeamSport} = {};
  loadingSportsFlag = true;

  editing = false;

  userData: UserData;
  loadingUserDataFlag = true;
  errorLoadingUserData = false;

  submittingFlag = false;
  errorSubmittingFlag = false;
  @Output() entryEdited: EventEmitter<PlayerToTeamSportDetails> = new EventEmitter<PlayerToTeamSportDetails>();
  @Output() entryDeleted: EventEmitter<PlayerToTeamSportDetails> = new EventEmitter<PlayerToTeamSportDetails>();

  constructor(private teamSportService: TeamSportService, private userDataService: UserDataService,
              private auth: Auth) {}

  ngOnInit(): void {
      this.loadingSportsFlag = true;
      this.teamSportService.getTeamSportsAvailable().then(sports => {
          sports.forEach(sport => this.sports[sport.name] = sport);
          this.loadingSportsFlag = false;
      }).catch(error => {
          this.loadingSportsFlag = false;
      });

      if (this.auth.authenticated()) {
          this.loadingUserDataFlag = true;
          this.userDataService.getUserPlayerData().then(userData => {
              this.userData = userData;
              this.loadingUserDataFlag = false;
              this.errorLoadingUserData = false;
          }).catch(error => {
              this.loadingUserDataFlag = false;
              this.errorLoadingUserData = true;
          });
      }
  }

  getSportsPlayed(): string[] {
      return Object.keys(this.playerToTeamSport);
  }

  userCanEdit(): boolean {
    return this.auth.userProfile ? this.auth.userProfile.user_id === this.userData.userId : false;
  }

}
