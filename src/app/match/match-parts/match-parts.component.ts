import * as moment from 'moment';

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatchPart} from '../match-part';

@Component({
  selector: 'app-match-parts',
  templateUrl: './match-parts.component.html',
  styleUrls: ['./match-parts.component.scss']
})
export class MatchPartsComponent implements OnInit {

  public model: MatchPart;
  public matchPartForm: FormGroup; // our model driven form

  public matchParts: MatchPart[] = [];

  @Output() matchPartsUpdated: EventEmitter<MatchPart[]> = new EventEmitter<MatchPart[]>();

  constructor() { }

  ngOnInit() {
      this.createDefaultData();
      this.model = new MatchPart();
      this.model.startingTime = new Date(moment().subtract(4, 'hours').toDate());
      this.model.endingTime = new Date(moment(this.model.startingTime).add(45, 'minutes').toDate());

      this.matchPartForm = new FormGroup({
          startingTime: new FormControl('', [<any>Validators.required]),
          endingTime: new FormControl('', [<any>Validators.required])
      });

  }

  private createDefaultData(): void {
      const firstHalf: MatchPart = new MatchPart();
      firstHalf.startingTime = new Date(moment().subtract(4, 'hours').toDate());
      firstHalf.endingTime = new Date(moment(firstHalf.startingTime).add(45, 'minutes').toDate());

      const secondHalf: MatchPart = new MatchPart();
      secondHalf.startingTime = new Date(moment(firstHalf.endingTime).add(15, 'minutes').toDate());
      secondHalf.endingTime = new Date(moment(secondHalf.startingTime).add(45, 'minutes').toDate());
      this.matchParts.push(firstHalf, secondHalf);
      this.matchPartsUpdated.emit(this.matchParts);
      console.log('Emitting match parts:', this.matchParts)
  }

}
