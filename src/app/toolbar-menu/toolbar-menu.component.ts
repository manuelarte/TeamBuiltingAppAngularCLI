import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MdDialog, MdIconRegistry} from '@angular/material';
import {TeamCudComponent} from '../profile/team-cud/team-cud.component';

@Component({
  selector: 'app-toolbar-menu',
  templateUrl: './toolbar-menu.component.html',
  styleUrls: ['./toolbar-menu.component.scss']
})
export class ToolbarMenuComponent implements OnInit {

  constructor(public dialog: MdDialog, private mdIconRegistry: MdIconRegistry, private sanitizer: DomSanitizer) {
    this.mdIconRegistry.addSvgIcon('team', sanitizer.bypassSecurityTrustResourceUrl('/images/icons/soccer-jersey.svg'));
  }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(TeamCudComponent);
      dialogRef.afterClosed().subscribe(result => {
      });
  }

}
