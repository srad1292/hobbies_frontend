import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }    from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//Components
import { AppComponent } from './app.component';
import { AnimeDetailComponent } from './anime-detail/anime-detail.component';
import { AnimeListComponent } from './anime-list/anime-list.component';
import { BookListComponent } from './book-list/book-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemSearchComponent } from './item-search/item-search.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

//Modules
import { AppRoutingModule } from './app-routing.module';

//Services
import { AnimeService } from './services/anime.service';
import { AuthenticationService } from './services/authentication.service';
import { ItemSearchService } from './services/item-search.service';
import { UserService } from './services/user.service';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    ItemSearchComponent,
    AnimeListComponent,
    BookListComponent,
    DashboardComponent,
    LoginComponent,
    RegistrationComponent,
    AnimeDetailComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AnimeService, AuthenticationService, ItemSearchService , UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
