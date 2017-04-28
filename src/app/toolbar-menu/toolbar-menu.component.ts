import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MdDialog, MdIconRegistry} from '@angular/material';
import {PlayerToSportDetailsModalComponent} from '../profile/player-to-sport-details-modal/player-to-sport-details-modal.component';
import {TeamCudDialogComponent} from '../team-cud-dialog/team-cud-dialog.component';

@Component({
  selector: 'app-toolbar-menu',
  templateUrl: './toolbar-menu.component.html',
  styleUrls: ['./toolbar-menu.component.scss']
})
export class ToolbarMenuComponent implements OnInit {

  constructor(public dialog: MdDialog, private mdIconRegistry: MdIconRegistry, private sanitizer: DomSanitizer) {
    this.mdIconRegistry.addSvgIcon('team', sanitizer.bypassSecurityTrustResourceUrl('/images/icons/football-badge.svg'));
    this.mdIconRegistry.addSvgIcon('player-to-team', sanitizer.bypassSecurityTrustResourceUrl('/images/icons/football-fans-group.svg'));
    this.mdIconRegistry.addSvgIcon('sport-position', sanitizer.bypassSecurityTrustResourceUrl('/images/icons/football-field.svg'));
  }

  ngOnInit() {
  }

  openTeamDialog() {
    const dialogRef = this.dialog.open(TeamCudDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
      });
  }

  openPlayerHistoryDialog() {
    const dialogRef = this.dialog.open(PlayerToSportDetailsModalComponent);
      dialogRef.afterClosed().subscribe(result => {
    });
  }

  openSportPositionDialog() {
    const dialogRef = this.dialog.open(PlayerToSportDetailsModalComponent);
      dialogRef.afterClosed().subscribe(result => {
    });
  }

}
