import { Component, OnInit, Input } from '@angular/core';
import {MatchService} from '../../services/match.service';
import {Match} from '../../match/match';
import {MatchFeedback} from '../../match-feedback/match-feedback';
import {MatchUtilsService} from '../../services/match-utils.service';
import {RegisteredPlayerInfo} from '../../match/playerInfo';

@Component({
  selector: 'app-player-detail-statistics-match-feedback-rating',
  templateUrl: './player-detail-statistics-match-feedback-rating.component.html',
  styleUrls: ['./player-detail-statistics-match-feedback-rating.component.scss'],
  providers: [MatchService, MatchUtilsService]
})
export class PlayerDetailStatisticsMatchFeedbackRatingComponent implements OnInit {

  @Input() player;

  fromDate: Date;
  toDate: Date;

  isLoadingMatches = false;
  errorLoadingMatches = false;
  matches: Match[];

  errorLoadingMatcheFeedback = false;
  matcheFeedback: Match[];

  matchAndFeedback: {[matchId: string]: {
      match: Match,
      feedbackInMatch: {
        entry: MatchFeedback,
        rate: number
        }[],
      }
  } = {};

  chartTable: any = {
      chartType: 'ComboChart',
      dataTable: null,
      options: {
          title : 'Rate per user and match',
          vAxis: {title: 'Stars'},
          hAxis: {title: 'Matches'},
          seriesType: 'bars',
          series: {5: {type: 'line'}}
      },
  };

  constructor(private matchService: MatchService,
              private matchUtilsService: MatchUtilsService) { }

  ngOnInit() {
    this.isLoadingMatches = true;
    this.matchService.getMatchesForDatesAndPlayerId(this.fromDate, this.toDate, 1).subscribe(matchesPage => {
        this.isLoadingMatches = false;
        this.matches = matchesPage.content;
        console.log("Matches of player:", matchesPage);
        this.matches.forEach(match => {
            this.matchService.getMatchFeedback(match.id).then(matchFeedback => {
                const feedback: {entry: MatchFeedback, rate: number}[] = matchFeedback.filter(entry => this.didFeedbackRatePlayer(match, entry)).map(entry => this.matchFeedbackPlayerRated(match, entry));
                this.matchAndFeedback[match.id] = {match: match, feedbackInMatch: feedback}

                if (!this.isBusy()) {
                    this.constructPieChartData();
                }
            })
        });
        console.log("matchAndFeedback", this.matchAndFeedback)
    });
  }

  isBusy(): boolean {
    return this.isLoadingMatches || this.isLoadingMatchFeedback();
  }

  isLoadingMatchFeedback(): boolean {
    return Object.keys(this.matchAndFeedback).length < this.matches.length;
  }

  getIdForPlayerIdInMatch(match: Match, playerId: number): string {
      return this.matchUtilsService.getAllPlayers(match).filter(playerInfo =>
          this.matchUtilsService.isRegisteredPlayer(playerInfo) && (<RegisteredPlayerInfo> playerInfo).playerId === playerId)[0].id
  }

  matchFeedbackPlayerRated(match: Match, matchFeedback: MatchFeedback): {entry: MatchFeedback, rate: number} {
      return {entry: matchFeedback, rate: matchFeedback.ratings[this.getIdForPlayerIdInMatch(match, this.player.id)]};
  }

  didFeedbackRatePlayer(match: Match, matchFeedback: MatchFeedback): boolean {
      return matchFeedback.ratings[this.getIdForPlayerIdInMatch(match, this.player.id)] != null;
  }

    /*  pieChartData =  {
       chartType: 'ComboChart',
       dataTable: [


        ["Match", "google-oauth2|115535991985670597779", 'underfined'],
        ["59a1ea2a73436212f038787f", null, null],
        ["599e997d749502364806306c", 4, null],
        ["596a203afbc95a2ca0342b38", 1, 5]
    ],
    options: {
        title : 'Rate per user and match',
        vAxis: {title: 'Stars'},
        hAxis: {title: 'Matches'},
        seriesType: 'bars',
        series: {5: {type: 'line'}}
    },
  };
  */

  constructPieChartData(): any {
    const dataTable: any[] = [];
    const usersWhoVoted: string[] = this.usersWhoVoted();
    dataTable.push(this.createHeaders(usersWhoVoted));
    Object.keys(this.matchAndFeedback).forEach(matchId => {
        const row: any[] = [];
        row.push(this.getXAxisValue(this.matchAndFeedback[matchId].match));
        usersWhoVoted.forEach(userId => {
            const entryMatchFeedback: {entry: MatchFeedback, rate: number}[] = this.matchAndFeedback[matchId].feedbackInMatch.filter(feedback => feedback.entry.userId === userId);
            console.log("entryMatchFeedback for:", matchId, userId, entryMatchFeedback);
            if (entryMatchFeedback.length === 1) {
               row.push(entryMatchFeedback[0].rate)
            } else if (entryMatchFeedback.length == 0) {
                row.push(null);
            }
            else {
                row.push(0.2);
            }
        });
        dataTable.push(row)
    });
    for (let i in dataTable[0]) {
      if (!dataTable[0][i]) {
          dataTable[0][i] = 'anonymous';
      }
    }
    console.log("dataTable:", dataTable);
    this.chartTable.dataTable = dataTable;
  }

  private createHeaders(columns: string[]): string[] {
    const headers: string[] = [];
    headers.push('Match');
    columns.forEach(column => headers.push(column));
    return headers;
  }

  private usersWhoVoted(): string[] {
    let usersWhoVoted: string[] = [];
    Object.keys(this.matchAndFeedback).forEach(matchId => {
      this.matchAndFeedback[matchId].feedbackInMatch.map(matchFeedback => matchFeedback.entry.userId)
          .forEach(userId => usersWhoVoted.push(userId))
    });
    return usersWhoVoted.filter(function(item, pos) {
          return usersWhoVoted.indexOf(item) == pos;
    });
  }

  private getXAxisValue(match: Match): string {
    return match.id;
  }

  isReady(): boolean {
    return this.chartTable != null;
  }

}
