import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomHttpResponse } from '../payload/CustomHttpResponse';
import { Observable } from 'rxjs';
import { Contact } from '../payload/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  // 'http://localhost:8080'
  host = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  // send contact
  public sendContact(contact: Contact): Observable<CustomHttpResponse> {

    return this.http.post<CustomHttpResponse>(`${this.host}/contact-send`, contact);

  } // end of sendContact()


} // end of class ContactService
