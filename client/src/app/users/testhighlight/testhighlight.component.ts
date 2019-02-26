import { Component } from '@angular/core';

@Component({
  selector: 'app-testhighlight',
  templateUrl: './testhighlight.component.html',
  styleUrls: ['./testhighlight.component.css']
})
export class TestHighlight {

  private content: string;
  public query: string;

  public constructor() {
    this.content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  }

  public highlight() {
    if(!this.query) {
      return this.content;
    }
    return this.content.replace(new RegExp(this.query, "gi"), match => {
      return '<span class="highlightText">' + match + '</span>';
    });
  }

}
