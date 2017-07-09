import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-my-string-widget',
  templateUrl: './my-string-widget.component.html',
  styleUrls: ['./my-string-widget.component.scss']
})
export class MyStringWidgetComponent implements OnInit {

  @Input() schema: {title: string, description: string, readOnly: boolean, [key: string]: Object};
  @Input() value: string = '';

  constructor() { }

  ngOnInit() {
  }

}
