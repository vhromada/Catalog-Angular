import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {ReactiveFormsModule} from "@angular/forms";
import {routing} from "./catalog.routing";
import {CatalogComponent} from "./catalog.component";
import {HomeComponent} from "./home/home.component";
import {MovieMenuComponent} from "./movies/movie.menu.component";
import {MovieGenresComponent} from "./movies/movie.genres.component";
import {MovieSubtitlesComponent} from "./movies/movie.subtitles.component";
import {MovieLengthComponent} from "./movies/movie.length.component";
import {MovieListComponent} from "./movies/movie.list.component";
import {MovieSetComponent} from "./movies/movie.set.component";
import {MovieUpdateComponent} from "./movies/movie.update.component";
import {GameMenuComponent} from "./games/game.menu.component";
import {GameAdditionalDataComponent} from "./games/game.additionaldata.component";
import {GameListComponent} from "./games/game.list.component";
import {GameSetComponent} from "./games/game.set.component";
import {GameUpdateComponent} from "./games/game.update.component";
import {MusicMenuComponent} from "./music/music.menu.component";
import {MusicListComponent} from "./music/music.list.component";
import {MusicSetComponent} from "./music/music.set.component";
import {MusicUpdateComponent} from "./music/music.update.component";
import {ProgramMenuComponent} from "./programs/program.menu.component";
import {ProgramAdditionalDataComponent} from "./programs/program.additionaldata.component";
import {ProgramListComponent} from "./programs/program.list.component";
import {ProgramSetComponent} from "./programs/program.set.component";
import {ProgramUpdateComponent} from "./programs/program.update.component";
import {GenreMenuComponent} from "./genres/genre.menu.component";
import {GenreListComponent} from "./genres/genre.list.component";
import {GenreSetComponent} from "./genres/genre.set.component";
import {GenreUpdateComponent} from "./genres/genre.update.component";
import {TimeService} from "./time.service";
import {LanguageService} from "./language.service";
import {MovieService} from "./movies/movie.service";
import {GameService} from "./games/game.service";
import {MusicService} from "./music/music.service";
import {SongService} from "./songs/song.service";
import {ProgramService} from "./programs/program.service";
import {GenreService} from "./genres/genre.service";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    routing
  ],
  declarations: [
    CatalogComponent,
    HomeComponent,
    MovieMenuComponent,
    MovieGenresComponent,
    MovieSubtitlesComponent,
    MovieLengthComponent,
    MovieListComponent,
    MovieSetComponent,
    MovieUpdateComponent,
    GameMenuComponent,
    GameAdditionalDataComponent,
    GameListComponent,
    GameSetComponent,
    GameUpdateComponent,
    MusicMenuComponent,
    MusicListComponent,
    MusicSetComponent,
    MusicUpdateComponent,
    ProgramMenuComponent,
    ProgramAdditionalDataComponent,
    ProgramListComponent,
    ProgramSetComponent,
    ProgramUpdateComponent,
    GenreMenuComponent,
    GenreListComponent,
    GenreSetComponent,
    GenreUpdateComponent
  ],
  providers: [
    TimeService,
    LanguageService,
    MovieService,
    GameService,
    MusicService,
    SongService,
    ProgramService,
    GenreService
  ],
  bootstrap: [
    CatalogComponent
  ]
})
export class CatalogModule {
}
