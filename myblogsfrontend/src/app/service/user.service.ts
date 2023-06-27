import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../payload/User';
import { Observable } from 'rxjs';
import { EditProfile } from '../payload/EditProfile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // 'http://localhost:8080'
  host = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  // create new user(customer signs up account)
  public createUser(user: User): Observable<User> {

    return this.http.post<User>(`${this.host}/user-create`, user);

  } // end of createUser()

  // update user profile
  public updateProfile(editProfile: EditProfile): Observable<User> {

    return this.http.put<User>(`${this.host}/edit-profile`, editProfile);

  } // end of updateProfile()

  // find user by user id
  findById(id: number): Observable<User> {

    return this.http.get<User>(`${this.host}/user-list/${id}`);

  } // end of findById()

} // end of class UserService