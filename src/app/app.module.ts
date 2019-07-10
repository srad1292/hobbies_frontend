import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }    from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//Components
import { AppComponent } from './app.component';
import { AnimeDetailComponent } from './anime-detail/anime-detail.component';
import { AnimeListComponent } from './anime-list/anime-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemSearchComponent } from './item-search/item-search.component';
import { ListTableComponent } from './shared/components/list-table/list-table.component';
import { LoginComponent } from './login/login.component';
import { MangaDetailsComponent } from './manga-details/manga-details.component';
import { MangaListComponent } from './manga-list/manga-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';

//Modules
import { AppRoutingModule } from './app-routing.module';

//Services
import { AnimeService } from './services/anime.service';
import { AuthenticationService } from './services/authentication.service';
import { BookService } from './services/book.service';
import { ItemSearchService } from './services/item-search.service';
import { MangaService } from './services/manga.service';
import { MovieService } from './services/movie.service';
import { UserService } from './services/user.service';



@NgModule({
  declarations: [
    AppComponent,
    AnimeDetailComponent,    
    AnimeListComponent,
    BookDetailComponent,    
    BookListComponent,
    DashboardComponent,
    ItemSearchComponent,    
    ListTableComponent,
    LoginComponent,
    MangaDetailsComponent,
    MangaListComponent,
    MovieDetailComponent,
    MovieListComponent,
    ProfileComponent,
    RegistrationComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AnimeService, AuthenticationService, BookService, ItemSearchService, MangaService, MovieService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
