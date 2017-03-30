import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ErrorEntityNotFoundComponent} from "./error-entity-not-found/error-entity-not-found.component";

const routes: Routes = [
    { path: '',
        children: [{
            path: '0001',
            component: ErrorEntityNotFoundComponent,
        }]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ErrorHandlingRoutingModule { }
