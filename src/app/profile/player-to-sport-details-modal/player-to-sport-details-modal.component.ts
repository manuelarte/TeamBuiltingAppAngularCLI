import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Modal} from "clarity-angular";
import {Player} from "../../player";
import {FormGroup} from "@angular/forms";
import {PlayerService} from "../../services/player.service";
import {PlayerToTeamSportDetails} from "../../player-to-team-sport-details";
import {Message} from "primeng/primeng";

@Component({
  selector: 'app-player-to-sport-details-modal',
  templateUrl: './player-to-sport-details-modal.component.html',
  styleUrls: ['./player-to-sport-details-modal.component.scss'],
  providers: [PlayerService]
})
export class PlayerToSportDetailsModalComponent implements OnInit {

  @ViewChild("modal") modal: Modal;

  @Input() player: Player;
  model: PlayerToTeamSportDetails = new PlayerToTeamSportDetails();
  submitting: boolean = false;
  msgs: Message[] = [];
  openValue: boolean = false;
  form: FormGroup = new FormGroup({});
  @Output() openChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() entrySaved: EventEmitter<PlayerToTeamSportDetails> = new EventEmitter<PlayerToTeamSportDetails>();

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.model.playerId = this.player.id;
  }

  @Input()
  get open(): boolean {
      return this.openValue
  }

  set open(val: boolean) {
      this.openValue = val;
      this.openChange.emit(this.open);
  }

  onSubmit(): void {
      this.submitting = true;
      this.playerService.savePlayerToTeamSportDetails(this.model).then(saved => {
          this.submitting = false;
          this.entrySaved.emit(saved);
          this.open = false;
      }).catch(error => {
          this.showMessageInEntry("error", "Entry cannot be saved", "");
          this.submitting = false;
      })
  }

  private showMessageInEntry(severity: string, summary: string, detail: string): any {
        return {severity: severity, summary: summary, detail: detail}
  }

}
