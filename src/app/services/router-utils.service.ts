import { Injectable } from '@angular/core';
import {Team} from "../team";
import {Player} from "../player";
import {Router} from "@angular/router";

@Injectable()
export class RouterUtilsService {

  constructor(private router: Router) { }

  public gotoTeamDetails(team: Team): Promise<boolean> {
    return this.gotoTeamDetailsById(team.id);
  }

  public gotoTeamDetailsById(teamId: string): Promise<boolean> {
    const link = ['/team', teamId];
    return this.router.navigate(link);
  }

  public gotoPlayerDetails(player: Player): Promise<boolean> {
    return this.gotoPlayerDetailsById(player.id);
  }

  public gotoPlayerDetailsById(playerId: number) {
      const link = ['/player', playerId];
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
