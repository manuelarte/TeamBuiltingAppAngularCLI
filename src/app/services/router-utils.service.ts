import { Injectable } from '@angular/core';
import {Team} from "../team";
import {Player} from "../player";
import {Router} from "@angular/router";

@Injectable()
export class RouterUtilsService {

  constructor(private router: Router) { }

  public gotoTeamDetails(team: Team): Promise<boolean> {
    let link = ['/team', team.id];
    return this.router.navigate(link);
  }

  public gotoPlayerDetails(player: Player): Promise<boolean> {
    let link = ['/player', player.id];
    return this.router.navigate(link);
  }

}
