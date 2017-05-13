import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {PlayerToTeamSportDetails} from '../../../player-to-team-sport-details';
import {TeamSport} from '../../../team-sports';
import {TeamSportService} from '../../../services/sports-service';
import {Player} from '../../../player';
import {Auth} from '../../../services/auth-service';
import {UserDataService} from '../../../services/user-data.service';
import {UserData} from '../../../user-data';
import {PlayerService} from '../../../services/player.service';
import {MdSnackBar} from '@angular/material';
import {UserRightsService} from '../../../services/user-rights.service';
import {PlayerToTeamSportService} from '../../../services/player-to-team-sport.service';


@Component({
  selector: 'app-player-detail-team-sports',
  templateUrl: 'player-detail-team-sports.component.html',
  styleUrls: ['player-detail-team-sports.component.scss'],
  providers: [TeamSportService, PlayerService, UserDataService]
})
export class PlayerDetailTeamSportsComponent implements OnInit {
  @Input() playerToTeamSport: {[sport: string]: PlayerToTeamSportDetails};
  /**
   * To represent the player in the field
   * @type {Player}
  */
  @Input() player: Player = new Player();
  sports: {[sportName: string]: TeamSport} = {};
  /**
  * The sport selected in the select box
  */
  sportSelected: string;
  loadingSportsFlag = true;

  editing = false;

  userData: UserData;
  loadingUserDataFlag = true;
  errorLoadingUserData = false;

  submittingFlag = false;
  errorSubmittingFlag = false;
  @Output() entryEdited: EventEmitter<PlayerToTeamSportDetails> = new EventEmitter<PlayerToTeamSportDetails>();
  @Output() entryDeleted: EventEmitter<PlayerToTeamSportDetails> = new EventEmitter<PlayerToTeamSportDetails>();

  constructor(private teamSportService: TeamSportService, private playerService: PlayerService, private userDataService: UserDataService,
              private playerToTeamSportService: PlayerToTeamSportService,
              private auth: Auth, public snackBar: MdSnackBar, private userRightsService: UserRightsService) {}

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
    return this.userRightsService.userCanEdit(this.userData, this.player.id);
  }

  editEntry(sportName: string): void {
    const entry: PlayerToTeamSportDetails = this.playerToTeamSport[sportName];
    this.submittingFlag = true;
    this.playerService.savePlayerToTeamSportDetails(entry).then(playerToTeamSportDetails => {
      this.showSnackBar('Entry Updated');
      this.submittingFlag = false;
      this.playerToTeamSport[sportName] = playerToTeamSportDetails;
      this.entryEdited.emit(entry);
      this.errorSubmittingFlag = false;
      this.editing = false;
    }).catch(error => {
      this.showSnackBar('Error updating the entry: ' + error.toString());
      this.submittingFlag = false;
      this.errorSubmittingFlag = true;
    });
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, null, {duration: 1000});
  }

  deleteEntry(sportName: string): void {
    const entry: PlayerToTeamSportDetails = this.playerToTeamSport[sportName];
    this.submittingFlag = true;
    this.playerService.deletePlayerToTeamSportDetails(entry).then(response => {
        this.playerToTeamSportService.playerToTeamSportDeletedEvent(entry);
        this.submittingFlag = false;
        this.errorSubmittingFlag = false;
        this.entryDeleted.emit(entry);
        this.showSnackBar('Entry deleted');
    }).catch(error => {
        this.submittingFlag = false;
        this.errorSubmittingFlag = true;
        this.showSnackBar('Error Deleting the Entry');
    });
  }

}
