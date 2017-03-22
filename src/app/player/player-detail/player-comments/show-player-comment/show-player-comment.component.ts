import {
    Component, OnInit, Input, Output, EventEmitter, trigger, state, transition, style,
    animate
}      from '@angular/core';
import {PlayerComment} from "../../../../player-comment";



@Component({
  moduleId: module.id,
  selector: 'show-player-comment',
  templateUrl: 'show-player-comment.component.html',
  styleUrls: ['show-player-comment.component.css'],
  providers: [ ],
  animations: [
      trigger('cardplayercomment', [
          state('*', style({
              '-ms-transform': 'translate3D(0px, 0px, 0px)',
              '-webkit-transform': 'translate3D(0px, 0px, 0px)',
              '-moz-transform': 'translate3D(0px, 0px, 0px)',
              '-o-transform':'translate3D(0px, 0px, 0px)',
              transform:'translate3D(0px, 0px, 0px)',
              opacity: 1})),
          transition('void => *', [
              style({opacity: 0,
                  '-ms-transform': 'translate3D(0px, 150px, 0px)',
                  '-webkit-transform': 'translate3D(0px, 150px, 0px)',
                  '-moz-transform': 'translate3D(0px, 150px, 0px)',
                  '-o-transform':'translate3D(0px, 150px, 0px)',
                  transform:'translate3D(0px, 150px, 0px)',
              }),
              animate('0.3s 0.25s ease-out')
          ])
      ]),
  ],
})
export class ShowPlayerCommentComponent implements OnInit {

  @Input() playerComment: PlayerComment = new PlayerComment();
  @Input() deleteable: boolean = false;
  @Input() user: any;

  @Output() onDeleted: EventEmitter<PlayerComment> = new EventEmitter<PlayerComment>();

  constructor(
  ) {}

  ngOnInit(): void {
  }

  deleteComment(): void {
    this.onDeleted.emit(this.playerComment);
  }

}
