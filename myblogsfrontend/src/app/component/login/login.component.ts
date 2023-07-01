import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { HeaderType } from 'src/app/enum/HeaderType';
import { NotificationType } from 'src/app/enum/NotificationType';
import { User } from 'src/app/payload/User';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // allow display spinner icon or not
  // =true: allow to display spinner in the "Login" button
  // =false: does not allow to display spinner in the "Login" button
  public showSpinner: boolean = false;

  loginForm!: FormGroup;
  user: User | undefined;

  errorMessages = {
    email: [
      { type: 'required', message: 'Please input an email' },
      { type: 'pattern', message: 'Email is incorrect format' }
    ],
    password: [
      { type: 'required', message: 'Please input a password' }
    ]
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private notifierService: NotifierService,
    private formBuilder: FormBuilder
  ) { }

  // this method is run right after component's constuctor has just finished
  ngOnInit(): void {

    // initial form
    this.initForm();

    // if user already logged-in before then navigate to '/post-list'
    if (this.authService.isLoggedInUser()) {

      // navigate to '/post-list';
      this.router.navigateByUrl(this.authService.urlAfterLogin);

    } else { // if user has not yet logged-in then re-direct to '/login'

      // navigate to the "/login" page
      this.router.navigateByUrl('/login');

    }
  } // end of ngOnInit()

  // initial form
  initForm() {

    this.loginForm = this.formBuilder.group({

      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],

      password: ['', [Validators.required]]

    });

  } // end of initForm()

  // when user clicks on the "Login" button
  public login(): void {

    // allow to show spinner(circle)
    this.showSpinner = true;

    // this.loginForm.value = { "email": "abc@gmail.com", "password": "abcxyz" }
    this.authService.login(this.loginForm.value)
      .subscribe({

        // login successful.
        // return: User and token
        next: (response: HttpResponse<User>) => {

          // get token from the header response
          const token = response.headers.get(HeaderType.JWT_TOKEN);

          // save token value into Local Storage
          this.authService.saveTokenToLocalStorage(token!);

          // save user into Local Storage
          this.authService.saveUserToLocalStorage(response.body!);

          // publish profileName to all subscribers
          this.authService.getProfileName(
            +this.authService.getIdFromLocalStorage(),
            this.authService.getEmailFromLocalStorage());

          // publish userid to all subscribers
          this.authService.userid.next(+this.authService.getIdFromLocalStorage());

          // navigate to url '/post-list'
          this.router.navigateByUrl(this.authService.urlAfterLogin);

          // hide spinner(circle)
          this.showSpinner = false;

        },
        // login failed
        error: (errorResponse: HttpErrorResponse) => {

          // publish profileName to all subscribers
          this.authService.getProfileName(
            +this.authService.getIdFromLocalStorage(),
            this.authService.getEmailFromLocalStorage());

          // publish userid to all subscribers
          this.authService.userid.next(+this.authService.getIdFromLocalStorage());

          // show error message
          this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);

          // hide spinner icon(circle)
          this.showSpinner = false;
        }
      });

  } // end of login()

  // show error message
  private sendErrorNotification(notificationType: NotificationType, message: string): void {

    // if there is message from system then use the system message
    if (message) {
      this.notifierService.notify(notificationType, message);
    } else { // use custom message
      this.notifierService.notify(notificationType, 'An error occurred. Please try again.');
    }
  } // end of sendErrorNotification()

} // end of class 'LoginComponent'