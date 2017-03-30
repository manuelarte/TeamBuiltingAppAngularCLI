import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorHandlingRoutingModule } from './error-handling-routing.module';
import {ErrorEntityNotFoundComponent} from "./error-entity-not-found/error-entity-not-found.component";

@NgModule({
  imports: [
    CommonModule,
    ErrorHandlingRoutingModule
  ],
  declarations: [ErrorEntityNotFoundComponent],
  exports: [ErrorEntityNotFoundComponent]
})
export class ErrorHandlingModule { }
