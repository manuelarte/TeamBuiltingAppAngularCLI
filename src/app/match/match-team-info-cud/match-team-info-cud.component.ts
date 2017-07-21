import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TeamSearchComponent} from '../../profile/team-search/team-search.component';
import {RegisteredTeamInfo, TeamInfo, UnRegisteredTeamInfo} from '../teamInfo';
import {Team} from '../../team';
import {UtilsService} from '../../services/utils.service';
import {Message} from 'primeng/primeng';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-match-team-info-cud',
  templateUrl: './match-team-info-cud.component.html',
  styleUrls: ['./match-team-info-cud.component.scss'],
  providers: [TeamSearchComponent, UtilsService]
})
export class MatchTeamInfoCudComponent implements OnInit {

  @Input() teamInfo: TeamInfo;
  @Input() private editable = true;

  /**
   * To check if the team is already registered in TeamBuilting
   * @type {boolean}
  */
  teamRegistered = true;

  /**
   * This is the holder when the team is not registered
   * @type {UnRegisteredTeamInfo}
  */
  unregisteredTeamInfo: UnRegisteredTeamInfo = new UnRegisteredTeamInfo();

  unregisteredTeamInfoForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    // imageLink: new FormControl('', [ Validators.required, Validators.minLength(6)]),
  });

  msgs: Message[] = [];

  @Output() teamSelectedEvent: EventEmitter<TeamInfo> = new EventEmitter<TeamInfo>();
  @Output() teamRemovedEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private utilsService: UtilsService) { }

  ngOnInit() {
      if (!this.teamInfo) {
        this.msgs.push({severity:'warn', summary:'', detail:'Team Not Selected'});
      }
  }

  isEditable(): boolean {
    return this.editable;
  }

  setTeamInfoFromTeam(team: Team): void {
    const registeredTeamInfo: RegisteredTeamInfo = new RegisteredTeamInfo();
    registeredTeamInfo.id = this.utilsService.guidGenerator();
    registeredTeamInfo.teamId = team.id;
    this.teamInfo = registeredTeamInfo;
    this.teamSelectedEvent.emit(this.teamInfo);
  }

  setTeamInfoFromUnRegisteredTeamInfo() {
      this.unregisteredTeamInfo.id = this.utilsService.guidGenerator();
      this.teamInfo = this.unregisteredTeamInfo;
      this.teamSelectedEvent.emit(this.teamInfo);
  }

  removeTeam(): void {
    this.teamInfo = null;
    this.teamRemovedEvent.emit();
  }

}
