import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {CatalogComponent} from './catalog.component';
import {CatalogRoutingModule} from './catalog.routing.module';
import {LanguageService} from './common/language.service';
import {EpisodeService} from './episodes/episode.service';
import {GameAdditionalDataComponent} from './games/game.additionaldata.component';
import {GameListComponent} from './games/game.list.component';
import {GameMenuComponent} from './games/game.menu.component';
import {GameNavigationComponent} from './games/game.navigation.component';
import {GameService} from './games/game.service';
import {GameSetComponent} from './games/game.set.component';
import {GenreListComponent} from './genres/genre.list.component';
import {GenreMenuComponent} from './genres/genre.menu.component';
import {GenreNavigationComponent} from './genres/genre.navigation.component';
import {GenreService} from './genres/genre.service';
import {GenreSetComponent} from './genres/genre.set.component';
import {HomeComponent} from './home/home.component';
import {MovieGenresComponent} from './movies/movie.genres.component';
import {MovieLengthComponent} from './movies/movie.length.component';
import {MovieListComponent} from './movies/movie.list.component';
import {MovieMediaComponent} from "./movies/movie.media.component";
import {MovieMenuComponent} from './movies/movie.menu.component';
import {MovieNavigationComponent} from './movies/movie.navigation.component';
import {MovieService} from './movies/movie.service';
import {MovieSetComponent} from './movies/movie.set.component';
import {MovieSubtitlesComponent} from './movies/movie.subtitles.component';
import {MusicListComponent} from './music/music.list.component';
import {MusicMenuComponent} from './music/music.menu.component';
import {MusicNavigationComponent} from './music/music.navigation.component';
import {MusicService} from './music/music.service';
import {MusicSetComponent} from './music/music.set.component';
import {ProgramAdditionalDataComponent} from './programs/program.additionaldata.component';
import {ProgramListComponent} from './programs/program.list.component';
import {ProgramMenuComponent} from './programs/program.menu.component';
import {ProgramNavigationComponent} from './programs/program.navigation.component';
import {ProgramService} from './programs/program.service';
import {ProgramSetComponent} from './programs/program.set.component';
import {SeasonService} from './seasons/season.service';
import {ShowGenresComponent} from './shows/show.genres.component';
import {ShowListComponent} from './shows/show.list.component';
import {ShowMenuComponent} from './shows/show.menu.component';
import {ShowNavigationComponent} from './shows/show.navigation.component';
import {ShowService} from './shows/show.service';
import {ShowSetComponent} from './shows/show.set.component';
import {SongLengthComponent} from './songs/song.length.component';
import {SongListComponent} from './songs/song.list.component';
import {SongMenuComponent} from './songs/song.menu.component';
import {SongService} from './songs/song.service';
import {SongSetComponent} from './songs/song.set.component';
import {SeasonListComponent} from "./seasons/season.list.component";
import {SeasonMenuComponent} from "./seasons/season.menu.component";
import {SeasonSubtitlesComponent} from "./seasons/season.subtitles.component";
import {SeasonYearsComponent} from "./seasons/season.years.component";
import {SeasonSetComponent} from "./seasons/season.set.component";
import {EpisodeLengthComponent} from './episodes/episode.length.component';
import {EpisodeListComponent} from './episodes/episode.list.component';
import {EpisodeMenuComponent} from './episodes/episode.menu.component';
import {EpisodeSetComponent} from './episodes/episode.set.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        CatalogRoutingModule
    ],
    declarations: [
        CatalogComponent,
        HomeComponent,
        MovieMenuComponent,
        MovieGenresComponent,
        MovieSubtitlesComponent,
        MovieLengthComponent,
        MovieMediaComponent,
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
        GenreNavigationComponent,
        SeasonListComponent,
        SeasonMenuComponent,
        SeasonSubtitlesComponent,
        SeasonYearsComponent,
        SeasonSetComponent,
        EpisodeLengthComponent,
        EpisodeMenuComponent,
        EpisodeListComponent,
        EpisodeSetComponent
    ],
    providers: [
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
