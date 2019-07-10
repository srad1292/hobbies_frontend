import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimeListComponent } from './anime-list/anime-list.component';
import { AnimeDetailComponent } from './anime-detail/anime-detail.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemSearchComponent } from './item-search/item-search.component';
import { LoginComponent } from './login/login.component';
import { MangaListComponent } from './manga-list/manga-list.component';
import { MangaDetailsComponent } from './manga-details/manga-details.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';


const routes: Routes = [
  // { path: '**', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'anime-list/:user', component: AnimeListComponent },
  { path: 'anime/:id', component: AnimeDetailComponent },
  { path: 'book/:id', component: BookDetailComponent },
  { path: 'book-list/:user', component: BookListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'manga-list/:user', component: MangaListComponent },
  { path: 'manga/:id', component: MangaDetailsComponent },
  { path: 'movie-list/:user', component: MovieListComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'search', component: ItemSearchComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule { }
