import {Component, Input, OnInit} from '@angular/core';
import {Match} from '../match';

@Component({
  selector: 'app-match-tags',
  templateUrl: './match-tags.component.html',
  styleUrls: ['./match-tags.component.scss']
})
export class MatchTagsComponent implements OnInit {

  @Input() private editable = false;
  @Input() match = new Match();

  constructor() { }

  ngOnInit() {

  }

  isEditable(): boolean {
    return this.editable;
  }

  getTags(): string[] {
    return this.match.tags;
  }

  addTag(tag: string): void {
    if (this.isTagValid(tag)) {
      this.match.tags.push(tag)
    }
  }

  isTagValid(tag: string): boolean {
    return !(!tag || tag === '' || this.getTags().filter(previousTag => previousTag === tag).length > 0);

  }

}
