import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(
    private authService: AuthService
  ) { }

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {

    // the following links do not need to attach JWT in requests
    if (httpRequest.url.includes(`${this.authService.host}/login`) ||
      (httpRequest.url.includes(`${this.authService.host}/signup`)) ||
      (httpRequest.url.includes(`${this.authService.host}/post-list`)) ||
      (httpRequest.url.includes(`${this.authService.host}/post-search`)) ||
      (httpRequest.url.includes(`${this.authService.host}/post-total-elements`))
    ) {

      // let forward it(do nothing)
      return httpHandler.handle(httpRequest);

    }

    // get token from local storage
    const token = this.authService.getTokenFromLocalStorage();

    // add token in the header of the request
    const request = httpRequest.clone({ setHeaders: { Authorization: `Bearer ${token}` } });

    console.log("token:" + token);

    return httpHandler.handle(request);

  } // end of intercept()

} // end of class AuthInterceptor