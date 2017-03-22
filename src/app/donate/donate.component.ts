import { Component } from '@angular/core';

@Component({
  selector: 'donate',
  styleUrls: ['donate.component.css'],
  templateUrl: 'donate.component.html'
})
export class DonateComponent {

    cmd: string = "_s-xclick";
    hosted_button_id: string = "HB83P3FGRX7WA";

    constructor() {

    }

    goToDonationPage(): string {
        return "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=HB83P3FGRX7WA";
    }
}
