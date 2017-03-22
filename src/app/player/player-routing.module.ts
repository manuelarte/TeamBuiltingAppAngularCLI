import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlayerDetailComponent} from "./player-detail/player-detail.component";

const routes: Routes = [
    { path: '',
        children: [{
            path: ':id',
            component: PlayerDetailComponent
        }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class PlayerRoutingModule { }
