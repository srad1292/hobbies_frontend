import { Component } from '@angular/core';
import { Router } from '@angular/router';

//Models
import { User } from './models/user';

//Services
import { AuthenticationService } from './services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'Hobby Ratings';
  userNavExpanded: boolean = true;
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  toggleUserNav() {
    this.userNavExpanded = !this.userNavExpanded;
  }
}
