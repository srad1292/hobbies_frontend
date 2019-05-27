import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

//Models
import { User } from '../models/user';

//Services
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  user: User;
  returnUrl: string;
  error;

  constructor(  
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) { 
          this.router.navigate(['/dashboard']);
      }
  }

  ngOnInit() {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(username){
      this.authenticationService.login(this.username, this.password)
      .pipe(first())
      .subscribe(
          data => {
              this.router.navigate([this.returnUrl]);
          },
          error => {
              let message;
              if( error ) {
                 const text = error.error.message || error.message || error.statusText || 'An Unknown Error Has Occured';
                 message = `${error.status}: ${text}`;
              }
              else {
                  message = 'An Unknown Error Has Occured';
              }
              this.error = message;
          });
  }
}
