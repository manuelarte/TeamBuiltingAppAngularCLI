import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-string-widget',
  templateUrl: './my-string-widget.component.html',
  styleUrls: ['./my-string-widget.component.scss']
})
export class MyStringWidgetComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  print(a: any) {
      console.log(a);
  }

}
