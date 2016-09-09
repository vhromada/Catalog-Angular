import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
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
