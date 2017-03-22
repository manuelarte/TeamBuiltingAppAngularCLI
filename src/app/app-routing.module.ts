import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {MyProfileComponent} from "./profile/my-profile/my-profile.component";
import {TeamCudComponent} from "./team/team-cud/team-cud.component";
import {PlayerDetailComponent} from "./player/player-detail/player-detail.component";
import {StatisticsComponent} from "./statistics/statistics.component";

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'myProfile', component: MyProfileComponent },

    { path: 'addTeam', component: TeamCudComponent },
    {
        // Point the loadChildren to your team module
        path: 'team',
        loadChildren: 'app/team/team.module#TeamModule'
    },
    {
        // Point the loadChildren to your team module
        path: 'player',
        loadChildren: 'app/player/player.module#PlayerModule'
    },
    { path: 'statistics', component: StatisticsComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
