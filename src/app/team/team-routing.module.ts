import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TeamDetailComponent} from "./team-detail/team-detail.component";

const routes: Routes = [
    { path: '',
        children: [{
            path: ':id',
            component: TeamDetailComponent
        }]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TeamRoutingModule { }
