import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {GenresComponent} from "./genres/genres.component";

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
    component: GenresComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(catalogRoutes);
