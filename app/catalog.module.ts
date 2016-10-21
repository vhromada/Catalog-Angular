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
import {MovieNavigationComponent} from "./movies/movie.navigation.component";
import {ShowMenuComponent} from "./shows/show.menu.component";
import {ShowGenresComponent} from "./shows/show.genres.component";
import {ShowListComponent} from "./shows/show.list.component";
import {ShowSetComponent} from "./shows/show.set.component";
import {ShowNavigationComponent} from "./shows/show.navigation.component";
import {GameMenuComponent} from "./games/game.menu.component";
import {GameAdditionalDataComponent} from "./games/game.additionaldata.component";
import {GameListComponent} from "./games/game.list.component";
import {GameSetComponent} from "./games/game.set.component";
import {GameNavigationComponent} from "./games/game.navigation.component";
import {MusicMenuComponent} from "./music/music.menu.component";
import {MusicListComponent} from "./music/music.list.component";
import {MusicSetComponent} from "./music/music.set.component";
import {MusicNavigationComponent} from "./music/music.navigation.component";
import {SongLengthComponent} from "./songs/song.length.component";
import {SongMenuComponent} from "./songs/song.menu.component";
import {SongListComponent} from "./songs/song.list.component";
import {SongSetComponent} from "./songs/song.set.component";
import {ProgramMenuComponent} from "./programs/program.menu.component";
import {ProgramAdditionalDataComponent} from "./programs/program.additionaldata.component";
import {ProgramListComponent} from "./programs/program.list.component";
import {ProgramSetComponent} from "./programs/program.set.component";
import {ProgramNavigationComponent} from "./programs/program.navigation.component";
import {GenreMenuComponent} from "./genres/genre.menu.component";
import {GenreListComponent} from "./genres/genre.list.component";
import {GenreSetComponent} from "./genres/genre.set.component";
import {GenreNavigationComponent} from "./genres/genre.navigation.component";
import {TimeService} from "./time.service";
import {LanguageService} from "./language.service";
import {MovieService} from "./movies/movie.service";
import {ShowService} from "./shows/show.service";
import {SeasonService} from "./seasons/season.service";
import {EpisodeService} from "./episodes/episode.service";
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
    MovieNavigationComponent,
    ShowMenuComponent,
    ShowGenresComponent,
    ShowListComponent,
    ShowSetComponent,
    ShowNavigationComponent,
    GameMenuComponent,
    GameAdditionalDataComponent,
    GameListComponent,
    GameSetComponent,
    GameNavigationComponent,
    MusicMenuComponent,
    MusicListComponent,
    MusicSetComponent,
    MusicNavigationComponent,
    SongLengthComponent,
    SongMenuComponent,
    SongListComponent,
    SongSetComponent,
    ProgramMenuComponent,
    ProgramAdditionalDataComponent,
    ProgramListComponent,
    ProgramSetComponent,
    ProgramNavigationComponent,
    GenreMenuComponent,
    GenreListComponent,
    GenreSetComponent,
    GenreNavigationComponent
  ],
  providers: [
    TimeService,
    LanguageService,
    MovieService,
    ShowService,
    SeasonService,
    EpisodeService,
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
