import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlayerFootballPositionComponent} from './player-position/player-football-position.component';
import {PlayerFutsalPositionComponent} from './player-position/player-futsal-position.component';
import {PlayerPositionIconComponent} from './player-position/player-position-icon/player-position-icon.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PlayerFootballPositionComponent, PlayerFutsalPositionComponent, PlayerPositionIconComponent],
  exports: [PlayerFootballPositionComponent, PlayerFutsalPositionComponent]
})
export class SportModule { }
