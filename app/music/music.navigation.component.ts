import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {MusicService} from "./music.service";

@Component({
  selector: 'music-navigation',
  template: ''
})
export class MusicNavigationComponent implements OnInit {

  constructor(private musicService: MusicService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let action = params['action'];
      switch (action) {
        case 'create':
          this.router.navigate(['/music/add']);
          break;
        case 'new':
          this.musicService.new().then(() => this.router.navigate(['/music/list']));
          break;
        case 'update':
          this.musicService.updatePositions().then(() => this.router.navigate(['/music/list']));
          break;
      }
    });
  }

}
