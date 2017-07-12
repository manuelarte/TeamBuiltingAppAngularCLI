import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-my-time-in-match-widget',
  templateUrl: './my-time-in-match-widget.component.html',
  styleUrls: ['./my-time-in-match-widget.component.scss']
})
export class MyTimeInMatchWidgetComponent implements OnInit {

  @Input() schema: {title: string, description: string, readOnly: boolean, [key: string]: Object};
  @Input() name: string;
  @Input() id: string;
  @Input() control: FormControl;
  @Input() value: any;

  constructor() { }

  ngOnInit() {
  }

}
