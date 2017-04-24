import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Player} from '../../player';
import {PlayerService} from '../../services/player.service';
import {PlayerToTeamSportDetails} from '../../player-to-team-sport-details';
import {Message} from 'primeng/primeng';
import {UserDataService} from '../../services/user-data.service';
import {MdDialogRef, MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-player-to-sport-details-modal',
  templateUrl: './player-to-sport-details-modal.component.html',
  styleUrls: ['./player-to-sport-details-modal.component.scss'],
  providers: [UserDataService, PlayerService]
})
export class PlayerToSportDetailsModalComponent implements OnInit {

  player: Player;
  model: PlayerToTeamSportDetails = new PlayerToTeamSportDetails();
  submitting = false;
  msgs: Message[] = [];
  @Output() entrySaved: EventEmitter<PlayerToTeamSportDetails> = new EventEmitter<PlayerToTeamSportDetails>();

  constructor(private userDataService: UserDataService, private playerService: PlayerService,
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
          this.submitting = false;
          this.entrySaved.emit(saved);
      }).catch(error => {
          this.showMessageInEntry('error', 'Entry cannot be saved', '');
          this.submitting = false;
      });
  }

  closeDialog(): void {
      this.dialogRef.close();
  }

  private showMessageInEntry(severity: string, summary: string, detail: string): any {
        return {severity: severity, summary: summary, detail: detail}
  }

}
