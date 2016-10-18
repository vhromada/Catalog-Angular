import {Component, Input, OnInit} from "@angular/core";
import {Show} from "./show";

@Component({
  selector: 'show-genres',
  template: '{{data}}'
})
export class ShowGenresComponent implements OnInit {

  @Input()
  show: Show;
  data: string;

  constructor() {
  }

  ngOnInit(): void {
    if (this.show) {
      this.data = Show.getGenres(this.show);
    }
  }

}
