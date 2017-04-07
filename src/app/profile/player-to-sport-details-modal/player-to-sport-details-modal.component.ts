import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Modal} from "clarity-angular";
import {Player} from "../../player";

@Component({
  selector: 'app-player-to-sport-details-modal',
  templateUrl: './player-to-sport-details-modal.component.html',
  styleUrls: ['./player-to-sport-details-modal.component.scss']
})
export class PlayerToSportDetailsModalComponent implements OnInit {

  @ViewChild("modal") modal: Modal;

  @Input() player: Player;
  openValue: boolean = false;
  @Output() openChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  @Input()
  get open(): boolean {
      return this.openValue
  }

  set open(val: boolean) {
      this.openValue = val;
      this.openChange.emit(this.open);
  }

}
