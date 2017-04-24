import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TeamSport, TeamSportPosition} from '../../team-sports';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PlayerToTeamSportDetails} from '../../player-to-team-sport-details';

@Component({
  selector: 'app-player-to-sport-details-common-cud',
  templateUrl: './player-to-sport-details-common-cud.component.html',
  styleUrls: ['./player-to-sport-details-common-cud.component.scss']
})
export class PlayerToSportDetailsCommonCudComponent implements OnInit {

  @Input() sport: TeamSport;
  @Input() model: PlayerToTeamSportDetails;
  @Input() editing = false;

  sportDetailsForm: FormGroup = new FormGroup({
    mainPosition: new FormControl({disabled: !this.editing || !this.model.sport}, Validators.required),
    otherPositions: new FormControl({disabled: !this.editing || !this.model.sport}, ),
    bio: new FormControl({disabled: !this.editing || !this.model.sport}, Validators.maxLength(500)),
  });

  @Output() form: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor() { }

  ngOnInit() {
  }

  getPositions(): TeamSportPosition[] {
        return this.sport.sportPositions;
    }

  getSparePositions(): TeamSportPosition[] {
    return this.getPositions().filter(position => position.abbreviation !== this.model.mainPosition);
  }

  emitForm(): void {
    this.form.emit(this.sportDetailsForm);
  }

}
