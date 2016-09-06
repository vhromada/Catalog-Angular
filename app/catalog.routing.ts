import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {GenreListComponent} from "./genres/genre.list.component";
import {GenreAddComponent} from "./genres/genre.add.component";

const catalogRoutes: Routes = [
  {
    path: '',
    redirectTo: '/catalog',
    pathMatch: 'full'
  },
  {
    path: 'catalog',
    component: HomeComponent
  },
  {
    path: 'genres',
    redirectTo: '/genres/list',
    pathMatch: 'full'
  },
  {
    path: 'genres/list',
    component: GenreListComponent
  },
  {
    path: 'genres/add',
    component: GenreAddComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(catalogRoutes);
