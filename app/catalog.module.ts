import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {GenreModule} from "./genres/genre.module";
import {routing} from "./catalog.routing";
import {CatalogComponent} from "./catalog.component";
import {HomeComponent} from "./home/home.component";

@NgModule({
  imports: [
    BrowserModule,
    GenreModule,
    routing
  ],
  declarations: [
    CatalogComponent,
    HomeComponent,
  ],
  bootstrap: [
    CatalogComponent
  ]
})
export class CatalogModule {
}
