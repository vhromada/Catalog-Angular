import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {routing} from "../catalog.routing";
import {GenreListComponent} from "./genre.list.component";
import {GenreAddComponent} from "./genre.add.component";
import {GenreService} from "./genre.service";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    routing
  ],
  declarations: [
    GenreListComponent,
    GenreAddComponent
  ],
  providers: [
    GenreService
  ]
})
export class GenreModule {
}
