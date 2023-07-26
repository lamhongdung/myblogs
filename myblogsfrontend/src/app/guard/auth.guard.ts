import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { NotifierService } from 'angular-notifier';
import { NotificationType } from '../enum/NotificationType';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private notifierService: NotifierService
  ) {

  }

  // return:
  //    - true: allow access the page
  //    - false: do not allow to access the page
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    // if user already logged-in
    if (this.isUserLoggedIn()) {

      // get user role
      let role = this.authService.getRoleFromLocalStorage();

      console.log("role:" + role);

      // if role is not correct then redirects to home page(/post-list)
      if (route.data['roles'].indexOf(role) === -1) {

        this.router.navigate(['/post-list'], {
          queryParams: { returnUrl: state.url }
        });

        // does not allow to access the page
        return false;

      } // end of 'if'

      // if role is correct then allow to access the page
      return true;
    }

    //
    // if user has not yet logged in
    //

    // if user has not yet logged in then re-direct to the "login" page
    this.router.navigate(['/login']);

    this.notifierService.notify(NotificationType.ERROR, `You need to log in to access this page`);

    return false;

  } // end of canActivate()

  // check whether user logged in or not.
  // =true: user already logged in.
  // =false: user has not yet logged in
  private isUserLoggedIn(): boolean {

    // if user logged in then return true
    if (this.authService.isLoggedInUser()) {

      return true;

    }

    return false;

  } // end of isUserLoggedIn()

} // end of class AuthGuard