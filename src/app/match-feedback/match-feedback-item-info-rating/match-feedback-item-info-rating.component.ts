import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DisplayableItemInfo} from '../../match/team-in-match';

@Component({
  selector: 'app-match-feedback-item-info-rating',
  templateUrl: './match-feedback-item-info-rating.component.html',
  styleUrls: ['./match-feedback-item-info-rating.component.scss']
})
export class MatchFeedbackItemInfoRatingComponent implements OnInit {

  @Input() displayableItemInfo: DisplayableItemInfo;
  valueValue: number;
  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  @Input()
  get value(): number {
    return this.valueValue;
  }

  set value(val: number) {
    this.valueValue = val;
    this.valueChange.emit(this.valueValue);
  }

  isValueDefined(): boolean {
    return this.valueValue !== null;
  }

}
