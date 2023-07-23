import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NotificationType } from 'src/app/enum/NotificationType';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // user id.
  // - userid = 0: user has not yet logged in the system.
  // - userid > 0: user already logged in the system.
  userid: number = 0;

  // user email who has just logged in
  loggedInEmail: string = "";

  // if user has not yet logged in the system: profileName = 'Guest'.
  // if user already logged in the system: profileName = userid + email.
  profileName: string = "";

  constructor(
    private router: Router,
    private authService: AuthService,
    private notifierService: NotifierService
  ) {

  }

  // this method is run right after finish construction(post construction)
  ngOnInit(): void {

    // get userid from local storage
    this.userid = +this.authService.getIdFromLocalStorage();

    // publish userid to all subscribers
    this.authService.userid.next(this.userid);
    // refresh value of userid
    this.authService.userid
      .subscribe(
        data => this.userid = data
      )

    // get email from local storage
    this.loggedInEmail = this.authService.getEmailFromLocalStorage();

    // publish profileName to all subscribers
    this.authService.getProfileName(
      +this.authService.getIdFromLocalStorage(),
      this.authService.getEmailFromLocalStorage()
    );

    // refresh value of profileName
    this.authService.profileName
      .subscribe(
        data => this.profileName = data
      )

    // console.log("userid:" + this.userid);

  } // end of ngOnInit()

  // user clicks on the "logout" menu
  logOut() {

    // clear token and user in local storage
    this.authService.logOut();

    // refresh value of userid
    this.authService.userid
      .subscribe(
        data => this.userid = data
      )

    // refresh value of profileName
    this.authService.profileName
      .subscribe(
        data => this.profileName = data
      )

    // navigate to '/post-list'
    this.router.navigate(['/post-list']);

    // show "Logout message" to user
    this.sendNotification(NotificationType.SUCCESS, "You have just logged out!");

  } // end of logOut()

  // send notification to user
  sendNotification(notificationType: NotificationType, message: string): void {

    if (message) {
      this.notifierService.notify(notificationType, message);
    } else {
      this.notifierService.notify(notificationType, 'An error occurred. Please try again.');
    }

  } // end of sendNotification()

} // end of class HeaderComponent