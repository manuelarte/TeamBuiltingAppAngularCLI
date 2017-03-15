import { NgModule } from '@angular/core';
import {GalleriaModule} from "primeng/primeng";
import { CommonModule } from '@angular/common';
import {HomeHowToComponent} from "./home-how-to/home-how-to.component";
import {HomeComponent} from "./home.component";
import {HomeHowToLoginComponent} from "./home-how-to-login/home-how-to-login.component";
import {HomeHowToIntroductionComponent} from "./home-how-to-introduction/home-how-to-introduction.component";
import {HomeHowToWhatToDoComponent} from "./home-how-to-what-to-do/home-how-to-what-to-do.component";
import {TeamModule} from "../team/team.module";

@NgModule({
  imports: [
    GalleriaModule,
    CommonModule,
    TeamModule,
  ],
  declarations: [
    HomeComponent,
    HomeHowToComponent,
    HomeHowToIntroductionComponent,
    HomeHowToLoginComponent,
    HomeHowToWhatToDoComponent,
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
