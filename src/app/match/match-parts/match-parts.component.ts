import * as moment from 'moment';

import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {MatchPart} from '../match-part';
import {unitOfTime} from 'moment';

@Component({
  selector: 'app-match-parts',
  templateUrl: './match-parts.component.html',
  styleUrls: ['./match-parts.component.scss']
})
export class MatchPartsComponent implements OnInit, OnChanges {

  @Input() matchParts: MatchPart[];

  defaultRestTime: number = 15;
  defautlPartDuration = 45;
  defaultNumberOfParts = 2;

  @Output() matchPartsUpdated: EventEmitter<MatchPart[]> = new EventEmitter<MatchPart[]>();

  constructor() { }

  ngOnInit() {
    if (!this.matchParts) {
      this.matchParts = [];
      this.createDefaultData();
    } else {
      this.matchParts.forEach(part => {
          part.startingTime = new Date(part.startingTime);
          part.endingTime = new Date(part.endingTime);
      });
    }
  }

  ngOnChanges() {
    this.matchPartsUpdated.emit(this.matchParts);
  }

  private createDefaultData(): void {

      const firstHalf: MatchPart = new MatchPart();
      firstHalf.startingTime = new Date(moment().subtract(4, 'hours').set({minute:0,second:0,millisecond:0}).toDate());
      firstHalf.endingTime = new Date(moment(firstHalf.startingTime).add(45, 'minutes').toDate());
      this.matchParts.push(firstHalf);

      for (let i = 1; i < this.defaultNumberOfParts; i++) {
        const matchPart: MatchPart = this.createNextMatchPartByPreviousOne(this.matchParts[i-1])
        this.matchParts.push(matchPart);
      }

      this.matchPartsUpdated.emit(this.matchParts);
  }

  private createNextMatchPartByPreviousOne(previousMatchPart: MatchPart): MatchPart {
      const matchPart: MatchPart = new MatchPart();
      matchPart.startingTime = new Date(moment(previousMatchPart.endingTime).add(this.defaultRestTime, 'minutes').toDate());
      matchPart.endingTime = new Date(moment(matchPart.startingTime).add(this.defautlPartDuration, 'minutes').toDate());
      return matchPart;
  }

  getDuration(matchPart: MatchPart, unit: unitOfTime.All): number {
      return moment(matchPart.endingTime).subtract(matchPart.endingTime).get(unit);
  }

  getAndsortMatchParts(): MatchPart[] {
    this.matchParts = this.matchParts.sort((d1, d2) => new Date(d1.startingTime).getTime() - new Date(d2.startingTime).getTime());
    return this.matchParts;
  }

  getMinDateForStartingDate(ri: number): Date {
    if (ri != 0) {
      return new Date(this.matchParts[ri-1].endingTime);
    }
    return null;
  }

  getMinDateForEndingDate(ri: number): Date {
    if (this.matchParts[ri]) {
      return new Date(this.matchParts[ri].startingTime);
    }
  }

  updateMatchParts(): void {
      console.log('updating!')
      this.matchPartsUpdated.emit(this.matchParts);
  }

  show() {
      console.log(this.matchParts);
  }

  addMatchPart(): void {
    const matchPart: MatchPart = this.createNextMatchPartByPreviousOne(this.matchParts[this.matchParts.length - 1]);
    this.matchParts.push(matchPart);
    this.matchParts = this.returnCopyOfMatchParts();

    this.matchPartsUpdated.emit(this.matchParts);
  }

  deleteMatchPartInIndex(ri: number): void {
    if (ri !== 0) {
      this.matchParts.splice(ri, 1);
      this.matchParts = this.returnCopyOfMatchParts();
      this.matchPartsUpdated.emit(this.matchParts);
    }
  }

  private returnCopyOfMatchParts(): MatchPart[] {
    const temp: MatchPart[] = [];
    this.matchParts.forEach(part => temp.push(part));

    return temp;
  }

}
