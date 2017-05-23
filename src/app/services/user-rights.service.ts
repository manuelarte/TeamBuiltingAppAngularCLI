import { Injectable } from '@angular/core';
import {Auth} from './auth-service';
import {UserData} from '../user-data';

@Injectable()
export class UserRightsService {

  constructor(private auth: Auth) { }

  public userCanGiveReward(userData: UserData, playerId: number): boolean {
    return this.auth.userProfile && userData ? userData.playerId !== playerId : false;
  }

  public userCanWriteComment(userData: UserData, playerId: number): boolean {
    return this.auth.userProfile && userData ? userData.playerId !== playerId : false;
  }

  public userCanEdit(userData: UserData, playerId: number): boolean {
    if (!playerId || !userData) {
     throw new Error('Inputs cannot be null');
    }
    return this.auth.userProfile  && userData ? userData.playerId === playerId : false;
  }

}
