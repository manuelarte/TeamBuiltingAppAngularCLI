import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MatchCudComponent} from './match-cud/match-cud.component';

const routes: Routes = [
    { path: '',
        children: [{
            path: 'add',
            component: MatchCudComponent
        }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class MatchRoutingModule { }
