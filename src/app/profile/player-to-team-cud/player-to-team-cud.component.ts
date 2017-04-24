import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {PlayerToTeam} from '../../player-to-team';
import {Team} from '../../team';
import {DatesService} from '../../services/dates-service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-player-to-team-cud',
  templateUrl: './player-to-team-cud.component.html',
  styleUrls: ['./player-to-team-cud.component.scss'],
  providers: [DatesService]
})
export class PlayerToTeamCudComponent implements OnInit {

  @Input() team: Team = new Team();
  @Input() model: PlayerToTeam = new PlayerToTeam();
  @Input() private editing = false;
  private stillActive = true;
  playerToTeamForm: FormGroup = new FormGroup({
        fromDate: new FormControl({disabled: !this.editing}, Validators.required),
        toDate: new FormControl({disabled: !this.editing || this.stillActive}, ),
    });
  @Output() form: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor(private datesService: DatesService) { }

  ngOnInit() {
      if (this.model.toDate) {
          this.stillActive = false;
      }
  }

  getMinDateForFromDate(): Date {
    if (this.team && this.team.fromDate) {
      return this.team.fromDate;
    } else {
      return new Date(-2208992400);
    }
  }

  getMinDateForToDate(index: number): Date {
    return this.model.fromDate ? this.model.fromDate : this.getMinDateForFromDate();
  }

  public getFromDate(): string {
    if (this.model && this.model.fromDate) {
      return this.datesService.dateToString(new Date(this.model.fromDate));
    }
    return '';
  }

  public getToDate(): string {
    if (this.model && this.model.toDate) {
      return this.datesService.dateToString(new Date(this.model.toDate));
    }
      return '';
    }

  isStillActive(): boolean {
    return this.stillActive;
  }

  changeIsStillActive(): void {
      this.stillActive = !this.stillActive;
  }

  emitForm(): void {
      this.form.emit(this.playerToTeamForm);
  }

  changeStillActive(): void {
      if (this.editing) {
        this.stillActive = !this.stillActive;
      }
  }

  isEditing(): boolean {
    return this.editing;
  }

  toDateIsAfterFromDate(): boolean {
      let toReturn = false;
      if (this.model.fromDate) {
        toReturn = this.stillActive ? true :
          this.model.toDate ? new Date(this.model.fromDate).getTime() < new Date(this.model.toDate).getTime() : true;
      }
      return toReturn;
  }

}
