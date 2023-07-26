import { Injectable } from '@angular/core';
import { User } from '../payload/User';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { LoginUser } from '../payload/LoginUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  // apiUrl = 'http://localhost:8080'
  public host = environment.apiUrl;

  // urlAfterLogin = '/post-list'
  public urlAfterLogin = environment.urlAfterLogin;

  public jwtHelper = new JwtHelperService();

  // 'profile name' is displayed at the top-right corner.
  // - if user already logged in: profileName = user id + user email.
  // - if user has not yet logged in: profileName = "Guest".
  profileName: Subject<string> = new BehaviorSubject<string>("");

  // user id
  userid: Subject<number> = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient
  ) { }

  // when user clicks on the "Login" button in the "Login" screen
  public login(loginUser: LoginUser): Observable<HttpResponse<User>> {

    return this.http.post<User>(`${this.host}/login`, loginUser, { observe: 'response' });

  } // end of login()

  // clear all data in the local storage when user clicks 'logout'
  public logOut(): void {

    // clear all saved data in localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // publish "userid = 0" to all subscribers
    this.userid.next(0);

    // publish profileName = "Guest" to all subscribes
    this.profileName.next("Guest");

  } // end of logOut()

  // save json web token(jwt) into the local storage
  public saveTokenToLocalStorage(token: string): void {

    localStorage.setItem('token', token);

  } // end of saveTokenToLocalStorage()

  // save the logged-in user into the local strorage
  public saveUserToLocalStorage(user: User): void {

    // save user object with json string format
    localStorage.setItem('user', JSON.stringify(user));

  } // end of saveUserToLocalStorage()

  // get token from local storage
  public getTokenFromLocalStorage(): string | null {

    return localStorage.getItem("token");

  } // end of getTokenFromLocalStorage()

  // get user from local storage
  public getUserFromLocalStorage(): User {

    return JSON.parse(localStorage.getItem('user')!);

  } // end of getUserFromLocalStorage()

  // check whether user logged in or not?
  // return:
  //    - true: user already logged in
  //    - false: user has not yet logged in
  public isLoggedInUser(): boolean {

    // get token from local storage
    const token = this.getTokenFromLocalStorage();

    // if token is existing in the local storage
    if (token != null && token !== '') {

      // get value of subject in the token(it means the email id).
      // if email is not empty <==>
      // if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
      if (this.jwtHelper.decodeToken(token).sub != null) {

        // if token has not yet expired
        if (!this.jwtHelper.isTokenExpired(token)) {

          return true;

        }
      }
    }

    return false;

  } // end of isLoggedInUser()

  // get user id of the logged in user
  public getIdFromLocalStorage(): number {

    // if user is existing in the local storage
    if (JSON.parse(localStorage.getItem('user')!) != null) {

      return JSON.parse(localStorage.getItem('user')!).id;

    }

    return 0;

  } // end of getIdFromLocalStorage()

  // get email of the logged in user
  public getEmailFromLocalStorage(): string {

    // if user is existing in the local storage
    if (JSON.parse(localStorage.getItem('user')!) != null) {

      return JSON.parse(localStorage.getItem('user')!).email;

    }

    return "";

  } // end of getEmailFromLocalStorage()

  // get role of the logged-in user
  public getRoleFromLocalStorage(): string {

    // if user is existing in the local storage
    if (JSON.parse(localStorage.getItem('user')!) != null) {

      return JSON.parse(localStorage.getItem('user')!).role;

    }

    return "";

  } // end of getRoleFromLocalStorage()

  // get 'profile name'.
  // return: id + " - " + email.
  public getProfileName(userid: number, email: string) {

    // if user has not yet logged in
    if (userid == 0 || userid == undefined) {

      // publish profileName = "Guest" to all subscribers
      this.profileName.next("Guest");

    } else { // if user has already logged in

      // publish "profileName = id + email" to all subscribers
      this.profileName.next(userid + " - " + email);

    }

  } // end of getProfileName()

} // end of class AuthService
