import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {ReactiveFormsModule} from "@angular/forms";
import {routing} from "../catalog.routing";
import {GenreMenuComponent} from "./genre.menu.component";
import {GenreListComponent} from "./genre.list.component";
import {GenreSetComponent} from "./genre.set.component";
import {GenreUpdateComponent} from "./genre.update.component";
import {GenreService} from "./genre.service";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    routing
  ],
  declarations: [
    GenreMenuComponent,
    GenreListComponent,
    GenreSetComponent,
    GenreUpdateComponent
  ],
  providers: [
    GenreService
  ]
})
export class GenreModule {
}
