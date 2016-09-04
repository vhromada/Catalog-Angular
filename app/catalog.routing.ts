import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {GenreListComponent} from "./genres/genre.list.component";

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
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(catalogRoutes);
