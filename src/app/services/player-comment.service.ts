import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import {PlayerComment} from '../player-comment';
import {environment} from '../../environments/environment';
import {AuthHttp} from 'angular2-jwt';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PlayerCommentService {

  private backendUrl = `${environment.backendExperienceUrl}`;
  private commentsPrefix = '/comments';
  private playersUrl = this.backendUrl + this.commentsPrefix + '/players';
  private reasonsUrl = this.backendUrl + this.commentsPrefix + '/reasons';

  constructor(private httpClient: HttpClient, private authHttp: AuthHttp) { }

  getPlayerComments(playerId: number): Promise<PlayerComment[]> {
    return this.httpClient.get<PlayerComment[]>(`${this.playersUrl}/${playerId}`).map(this.convertWhenForArray)
      .toPromise();
  }

  postNewPlayerComment(playerComment: PlayerComment): Promise<PlayerComment> {
      return this.authHttp.post(`${this.playersUrl}`, playerComment).map(this.convertWhen).toPromise();
  }

  deletePlayerComment(id: string): Promise<any> {
      return this.authHttp.delete(`${this.playersUrl}/${id}`).toPromise();
  }

  getCommentReasons(): Promise<string[]> {
      return this.httpClient.get<string[]>(`${this.reasonsUrl}`).toPromise();
  }


  private convertWhenForArray(data: PlayerComment[]) {
    data.forEach(d => {
        d.when = new Date(d.when);
    });
    return data;
  }

  private convertWhen(value: any) {
    const data = value.json() || {};
    data.when = new Date(data.when);
    return data;
  }



}
