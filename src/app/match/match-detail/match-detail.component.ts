import {Component, OnInit} from '@angular/core';
import {Match} from "../match";
import {MatchService} from '../../services/match.service';
import {Params, ActivatedRoute} from '@angular/router';
import {MatchFeedback} from '../../match-feedback/match-feedback';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss'],
  providers: [MatchService]
})
export class MatchDetailComponent implements OnInit {

  loadingMatch = false;
  errorLoadingMatch = false;
  match: Match;

  loadingFeedback = false;
  errorLoadingFeedback = false;
  allUsersMatchFeedback: MatchFeedback[];

  constructor(private matchService: MatchService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const id = params['id'];

      this.loadingMatch = true;
      this.matchService.getMatch(id).then(match => {
        this.loadingMatch = false;
        this.match = match;
      });

      this.loadingFeedback = true;
      this.matchService.getMatchFeedback(id).then(allUsersMatchFeedback => {
        this.allUsersMatchFeedback = allUsersMatchFeedback;
        this.loadingFeedback = false;
        this.errorLoadingFeedback = false;
        console.log('matchFeedback:', this.allUsersMatchFeedback);
      }).catch(error => {
        this.loadingFeedback = false;
        this.errorLoadingFeedback = true;
      });

    });
  }

}
