import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

//models
import { User } from '../models/user';

//Services
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

    newUser: User = new User;
    isLoading: boolean = false;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/dashboard']);
        }
    }

    ngOnInit() {
    }

    submitRegistration() {
      this.isLoading = true;
      this.userService.register(this.newUser)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                },
                error => {
                },
                () => { this.isLoading = false; }
            );
    }

}
