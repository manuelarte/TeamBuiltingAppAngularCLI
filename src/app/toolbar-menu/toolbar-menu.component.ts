import { Component, OnInit } from '@angular/core';
import {MdDialog} from '@angular/material';
import {PlayerToSportDetailsModalComponent} from '../profile/player-to-sport-details-modal/player-to-sport-details-modal.component';
import {TeamCudDialogComponent} from '../team-cud-dialog/team-cud-dialog.component';
import {PlayerToTeamWizardComponent} from '../profile/player-to-team-wizard/player-to-team-wizard.component';
import {Team} from '../team';

@Component({
  selector: 'app-toolbar-menu',
  templateUrl: './toolbar-menu.component.html',
  styleUrls: ['./toolbar-menu.component.scss']
})
export class ToolbarMenuComponent implements OnInit {

  constructor(public dialog: MdDialog) {
  }

  ngOnInit() {
  }

  openTeamDialog() {
    const dialogRef = this.dialog.open(TeamCudDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.openPlayerHistoryDialog(result);
          }
      });
  }

  openPlayerHistoryDialog(team?: Team) {
    const dialogRef = this.dialog.open(PlayerToTeamWizardComponent);
      dialogRef.afterClosed().subscribe(result => {
    });
    if (team) {
      dialogRef.componentInstance.team = team;
    }
  }

  openSportPositionDialog() {
    const dialogRef = this.dialog.open(PlayerToSportDetailsModalComponent);
      dialogRef.afterClosed().subscribe(result => {
    });
  }

}
