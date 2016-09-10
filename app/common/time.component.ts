import {Component, Input, OnInit} from "@angular/core";
import {TimeService} from "./time.service";

@Component({
  selector: 'catalog-time',
  template: '{{data}}'
})
export class TimeComponent implements OnInit {

  @Input()
  time: number;
  data: string;

  constructor(private timeService: TimeService) {
  }

  ngOnInit(): void {
    if (this.time) {
      this.timeService.time(this.time).then(time => this.data = time);
    } else {
      this.timeService.time(0).then(time => this.data = time);
    }
  }

}
