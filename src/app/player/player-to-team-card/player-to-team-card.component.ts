import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlayerToTeam} from '../../player-to-team';
import {TeamService} from '../../services/team.service';
import {Team} from '../../team';
import {Player} from '../../player';
import {PlayerService} from '../../services/player.service';
import {Auth} from '../../services/auth-service';
import {UserDataService} from '../../services/user-data.service';
import {UserData} from '../../user-data';
import {MdSnackBar} from '@angular/material';
import {UserRightsService} from "../../services/user-rights.service";
import {RouterUtilsService} from "../../services/router-utils.service";
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: 'app-player-to-team-card',
  templateUrl: './player-to-team-card.component.html',
  styleUrls: ['./player-to-team-card.component.scss'],
  providers: [PlayerService, TeamService, UserDataService, RouterUtilsService, UtilsService]
})
export class PlayerToTeamCardComponent implements OnInit {

  @Input() playerToTeam: PlayerToTeam = new PlayerToTeam();
  team: Team;
  loadingTeamFlag = true;
  errorLoadingTeam = false;

  player: Player;
  loadingPlayerFlag = true;
  errorLoadingPlayer = false;

  userData: UserData;
  loadingUserDataFlag = true;
  errorLoadingUserData = false;

  editingValue = false;
  @Output() editingChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  submittingFlag = false;
  errorSubmittingFlag = false;
  @Output() entryEdited: EventEmitter<PlayerToTeam> = new EventEmitter<PlayerToTeam>();
  @Output() entryDeleted: EventEmitter<PlayerToTeam> = new EventEmitter<PlayerToTeam>();

  constructor(private playerService: PlayerService, private teamService: TeamService, private userDataService: UserDataService,
              private auth: Auth, public snackBar: MdSnackBar, private userRightsService: UserRightsService, public routerUtilsService: RouterUtilsService,
  private utilsService: UtilsService) { }

  ngOnInit() {
      if (this.playerToTeam.teamId) {
        this.loadingTeamFlag = true;
        this.teamService.getTeam(this.playerToTeam.teamId).then(team => {
            this.team = team;
            this.loadingTeamFlag = false;
            this.errorLoadingTeam = false;
        }).catch(error => {
            this.loadingTeamFlag = false;
            this.errorLoadingTeam = true;
        });
      }

      if (this.playerToTeam.playerId) {
          this.loadingPlayerFlag = true;
          this.playerService.getPlayer(this.playerToTeam.playerId).then(player => {
              this.player = player;
              this.loadingPlayerFlag = false;
              this.errorLoadingPlayer = false;
          }).catch(error => {
              this.loadingPlayerFlag = false;
              this.errorLoadingPlayer = true;
          });
      }

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

  @Input()
  get editing(): boolean {
    return this.editingValue;
  }

  set editing(value: boolean) {
    this.editingValue = value;
    this.editingChange.emit(this.editingValue);
  }

  userCanEdit(): boolean {
      return this.userRightsService.userCanEdit(this.userData, this.playerToTeam.playerId);
  }

  editEntry(): void {
    this.submittingFlag = true;
    this.playerService.savePlayerToTeam(this.playerToTeam).then(playerToTeam => {
      this.showSnackBar('Entry Updated');
      this.submittingFlag = false;
      this.playerToTeam = playerToTeam;
      this.entryEdited.emit(this.playerToTeam);
      this.errorSubmittingFlag = false;
      this.editingValue = false;
    }).catch(error => {
      this.showSnackBar('Error updating the entry: ' + error.toString());
      this.submittingFlag = false;
      this.errorSubmittingFlag = true;
    });
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, null, {duration: 1000});
  }

  deleteEntry(): void {
      this.submittingFlag = true;
      this.playerService.deletePlayerToTeam(this.playerToTeam).then(response => {
          this.submittingFlag = false;
          this.errorSubmittingFlag = false;
          this.entryDeleted.emit(this.playerToTeam);
          this.showSnackBar('Entry deleted');
      }).catch(error => {
          this.submittingFlag = false;
          this.errorSubmittingFlag = true;
          this.showSnackBar('Error Deleting the Entry');
      });
  }

  getPictureBasedOnSport(): string {
      if (this.team) {
        return this.utilsService.getPictureBasedOnSport(this.team.sport);
      }
      return '';
  }

}
