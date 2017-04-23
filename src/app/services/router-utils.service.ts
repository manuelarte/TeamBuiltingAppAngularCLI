import { Injectable } from '@angular/core';
import {Team} from "../team";
import {Player} from "../player";
import {Router} from "@angular/router";

@Injectable()
export class RouterUtilsService {

  constructor(private router: Router) { }

  public gotoTeamDetails(team: Team): Promise<boolean> {
    const link = ['/team', team.id];
    return this.router.navigate(link);
  }

  public gotoPlayerDetails(player: Player): Promise<boolean> {
    const link = ['/player', player.id];
    return this.router.navigate(link);
  }

  public gotoMyProfile(): Promise<boolean> {
      const link = ['/myProfile', ''];
    return this.router.navigate(link);
  }

  public gotoHome(): Promise<boolean> {
    const link = ['/home', ''];
    return this.router.navigate(link);
  }

}
