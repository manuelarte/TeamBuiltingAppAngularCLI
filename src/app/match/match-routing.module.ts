import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MatchCudComponent} from './match-cud/match-cud.component';
import {MatchDetailComponent} from "./match-detail/match-detail.component";

const routes: Routes = [
    { path: '',
        children: [{
          path: 'add',
          component: MatchCudComponent
        }, {
          path: ':id',
          component: MatchDetailComponent
        }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class MatchRoutingModule { }
