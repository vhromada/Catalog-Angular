import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {GameListComponent} from "./games/game.list.component";
import {GameSetComponent} from "./games/game.set.component";
import {GameUpdateComponent} from "./games/game.update.component";
import {MusicListComponent} from "./music/music.list.component";
import {MusicSetComponent} from "./music/music.set.component";
import {MusicUpdateComponent} from "./music/music.update.component";
import {ProgramListComponent} from "./programs/program.list.component";
import {ProgramSetComponent} from "./programs/program.set.component";
import {ProgramUpdateComponent} from "./programs/program.update.component";
import {GenreListComponent} from "./genres/genre.list.component";
import {GenreSetComponent} from "./genres/genre.set.component";
import {GenreUpdateComponent} from "./genres/genre.update.component";

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
    path: 'games/update',
    component: GameUpdateComponent
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
    path: 'music/update',
    component: MusicUpdateComponent
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
    path: 'programs/update',
    component: ProgramUpdateComponent
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
    path: 'genres/update',
    component: GenreUpdateComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(catalogRoutes);
