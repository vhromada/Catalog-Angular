import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {MusicService} from "./music.service";

@Component({
  selector: 'music-menu',
  templateUrl: 'app/music/music.menu.component.html'
})
export class MusicMenuComponent {

  constructor(private musicService: MusicService,
              private router: Router) {
  }

  newData(): void {
    this.musicService.new().then(() => this.router.navigate(['/music/update']));
  }

  add(): void {
    this.router.navigate(['/music/add']);
  }

  updatePositions(): void {
    this.musicService.updatePositions().then(() => this.router.navigate(['/music/update']));
  }

}
