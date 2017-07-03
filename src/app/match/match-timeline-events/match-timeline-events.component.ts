import { Component, OnInit } from '@angular/core';
import {MatchEvent} from '../match-events';

@Component({
  selector: 'app-match-timeline-events',
  templateUrl: './match-timeline-events.component.html',
  styleUrls: ['./match-timeline-events.component.scss']
})
export class MatchTimelineEventsComponent implements OnInit {

  eventsType: string[] = ['goal', 'substitution', 'injury'];
  eventType: string;

  myEvent: MatchEvent;

   /* mySchema = {
        properties: {
            email: {
                type: 'string',
                description: 'email',
                format: 'email'
            },
            password: {
                type: 'string',
                description: 'Password'
            },
            rememberMe: {
                type: 'boolean',
                default: false,
                description: 'Remember me'
            }
        },
        required: ['email', 'password', 'rememberMe']
    };*/

   mySchema = {
       type: 'object',
       id: 'urn:jsonschema:org:manuel:teambuilting:matches:model:parts:events:GoalEvent',
       properties: {
           teamThatScored: {
               type: 'string',
               description: 'Team that scored',
               enum: ['homeTeamInfoId', 'awayTeamInfoId'],
               buttons: [{
                   id: 'reset',
                   label: 'Reset'
               }]
           },
           description: {
               type: 'string',
               description: 'Description of the goal',
               maxLength: 20,
           },
           when: {
               type: 'integer',
               description: 'When?',
               format: 'utc-millisec'
           },
           who: {
               description: 'Who Scored?',
               type: 'string'
           }
       },
       buttons: [{
           id: 'alert', // the id of the action callback
           label: 'Alert !' // the text inside the button
       }]
   };

    myActions = {
        'alert': (property) => {alert(JSON.stringify(property.value)); },
        'reset': (property) => {property.reset(); }
    };

  constructor() { }

  ngOnInit() {
  }

};
