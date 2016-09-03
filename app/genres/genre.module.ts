import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {routing} from "../catalog.routing";
import {GenresComponent} from "./genres.component";
import {GenreService} from "./genre.service";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    routing
  ],
  declarations: [
    GenresComponent
  ],
  providers: [
    GenreService
  ]
})
export class GenreModule {
}
