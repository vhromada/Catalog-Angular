import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {MovieListComponent} from "./movies/movie.list.component";
import {MovieSetComponent} from "./movies/movie.set.component";
import {MovieNavigationComponent} from "./movies/movie.navigation.component";
import {ShowListComponent} from "./shows/show.list.component";
import {ShowSetComponent} from "./shows/show.set.component";
import {ShowNavigationComponent} from "./shows/show.navigation.component";
import {GameListComponent} from "./games/game.list.component";
import {GameSetComponent} from "./games/game.set.component";
import {GameNavigationComponent} from "./games/game.navigation.component";
import {MusicListComponent} from "./music/music.list.component";
import {MusicSetComponent} from "./music/music.set.component";
import {MusicNavigationComponent} from "./music/music.navigation.component";
import {ProgramListComponent} from "./programs/program.list.component";
import {ProgramSetComponent} from "./programs/program.set.component";
import {ProgramNavigationComponent} from "./programs/program.navigation.component";
import {GenreListComponent} from "./genres/genre.list.component";
import {GenreSetComponent} from "./genres/genre.set.component";
import {GenreNavigationComponent} from "./genres/genre.navigation.component";

const catalogRoutes: Routes = [
  {
    path: '',
    redirectTo: '/catalog',
    pathMatch: 'full'
  },
  {
    path: 'catalog',
    component: HomeComponent,
  },
  {
    path: 'movies/list',
    component: MovieListComponent
  },
  {
    path: 'movies/add',
    component: MovieSetComponent
  },
  {
    path: 'movies/edit/:id',
    component: MovieSetComponent
  },
  {
    path: 'movies/:action',
    component: MovieNavigationComponent
  },
  {
    path: 'shows/list',
    component: ShowListComponent
  },
  {
    path: 'shows/add',
    component: ShowSetComponent
  },
  {
    path: 'shows/edit/:id',
    component: ShowSetComponent
  },
  {
    path: 'shows/:action',
    component: ShowNavigationComponent
  },
  {
    path: 'games/list',
    component: GameListComponent
  },
  {
    path: 'games/add',
    component: GameSetComponent
  },
  {
    path: 'games/edit/:id',
    component: GameSetComponent
  },
  {
    path: 'games/:action',
    component: GameNavigationComponent
  },
  {
    path: 'music/list',
    component: MusicListComponent
  },
  {
    path: 'music/add',
    component: MusicSetComponent
  },
  {
    path: 'music/edit/:id',
    component: MusicSetComponent
  },
  {
    path: 'music/:action',
    component: MusicNavigationComponent
  },
  {
    path: 'programs/list',
    component: ProgramListComponent
  },
  {
    path: 'programs/add',
    component: ProgramSetComponent
  },
  {
    path: 'programs/edit/:id',
    component: ProgramSetComponent
  },
  {
    path: 'programs/:action',
    component: ProgramNavigationComponent
  },
  {
    path: 'genres/list',
    component: GenreListComponent
  },
  {
    path: 'genres/add',
    component: GenreSetComponent
  },
  {
    path: 'genres/edit/:id',
    component: GenreSetComponent
  },
  {
    path: 'genres/:action',
    component: GenreNavigationComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(catalogRoutes);
