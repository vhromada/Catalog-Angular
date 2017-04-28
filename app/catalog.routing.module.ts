import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GameListComponent} from './games/game.list.component';
import {GameNavigationComponent} from './games/game.navigation.component';
import {GameSetComponent} from './games/game.set.component';
import {GenreListComponent} from './genres/genre.list.component';
import {GenreNavigationComponent} from './genres/genre.navigation.component';
import {GenreSetComponent} from './genres/genre.set.component';
import {HomeComponent} from './home/home.component';
import {MovieListComponent} from './movies/movie.list.component';
import {MovieNavigationComponent} from './movies/movie.navigation.component';
import {MovieSetComponent} from './movies/movie.set.component';
import {MusicListComponent} from './music/music.list.component';
import {MusicNavigationComponent} from './music/music.navigation.component';
import {MusicSetComponent} from './music/music.set.component';
import {ProgramListComponent} from './programs/program.list.component';
import {ProgramNavigationComponent} from './programs/program.navigation.component';
import {ProgramSetComponent} from './programs/program.set.component';
import {ShowListComponent} from './shows/show.list.component';
import {ShowNavigationComponent} from './shows/show.navigation.component';
import {ShowSetComponent} from './shows/show.set.component';
import {SongListComponent} from './songs/song.list.component';
import {SongSetComponent} from './songs/song.set.component';

const routes: Routes = [
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
        path: 'music/:musicId/songs/list',
        component: SongListComponent
    },
    {
        path: 'music/:musicId/songs/add',
        component: SongSetComponent
    },
    {
        path: 'music/:musicId/songs/edit/:songId',
        component: SongSetComponent
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

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class CatalogRoutingModule {
}
