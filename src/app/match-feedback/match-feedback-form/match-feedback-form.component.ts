import {Component, Input, OnInit} from '@angular/core';
import {MatchFeedback} from '../match-feedback';
import {PlayerInfo} from '../../match/playerInfo';

@Component({
  selector: 'app-match-feedback-form',
  templateUrl: './match-feedback-form.component.html',
  styleUrls: ['./match-feedback-form.component.scss']
})
export class MatchFeedbackFormComponent implements OnInit {

  @Input() match;
  @Input() matchFeedback = new MatchFeedback();

  constructor() { }

  ngOnInit() {
  }

  getHomePlayers(): PlayerInfo[] {
    return this.match.homeTeam.selectedPlayers;
  }

  getAwayPlayers(): PlayerInfo[] {
    return this.match.awayTeam.selectedPlayers;
  }

}
