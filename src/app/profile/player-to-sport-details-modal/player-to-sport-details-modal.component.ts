import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Player} from '../../player';
import {PlayerService} from '../../services/player.service';
import {PlayerToTeamSportDetails} from '../../player-to-team-sport-details';
import {UserDataService} from '../../services/user-data.service';
import {MdDialogRef, MdSnackBar} from '@angular/material';
import {FormGroup} from '@angular/forms';
import {PlayerToTeamSportService} from '../../services/player-to-team-sport.service';

@Component({
  selector: 'app-player-to-sport-details-modal',
  templateUrl: './player-to-sport-details-modal.component.html',
  styleUrls: ['./player-to-sport-details-modal.component.scss'],
  providers: [UserDataService, PlayerService]
})
export class PlayerToSportDetailsModalComponent implements OnInit {

  player: Player;
  model: PlayerToTeamSportDetails = new PlayerToTeamSportDetails();
  form: FormGroup;
  submitting = false;
  @Output() entrySaved: EventEmitter<PlayerToTeamSportDetails> = new EventEmitter<PlayerToTeamSportDetails>();

  constructor(private userDataService: UserDataService, private playerService: PlayerService,
              private playerToTeamSportService: PlayerToTeamSportService,
              public dialogRef: MdDialogRef<PlayerToSportDetailsModalComponent>, public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.userDataService.getUserPlayerData().then(userData => {
          this.playerService.getPlayer(userData.playerId).then(player => {
              this.player = player;
              this.model.playerId = this.player.id;
          });
    });
  }

  onSubmit(): void {
      this.submitting = true;
      this.playerService.savePlayerToTeamSportDetails(this.model).then(saved => {
          this.playerToTeamSportService.playerToTeamSportAddedEvent(saved);
          this.submitting = false;
          this.entrySaved.emit(saved);
          this.showSnackBar('Entry Saved');
          this.dialogRef.close();
      }).catch(error => {
          this.showSnackBar('Entry cannot be saved: ' + error.toString());
          this.submitting = false;
      });
  }

  closeDialog(): void {
      this.dialogRef.close();
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, null, {duration: 2000});
  }

}
