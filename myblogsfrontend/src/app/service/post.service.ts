import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostSearchResponse } from '../payload/PostSearchResponse';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  // 'http://localhost:8080'
  host = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  // // create new user(customer signs up account)
  // public createUser(user: User): Observable<User> {

  //   return this.http.post<User>(`${this.host}/user-create`, user);

  // } // end of createUser()

  // // update user profile
  // public updateProfile(editProfile: EditProfile): Observable<User> {

  //   return this.http.put<User>(`${this.host}/edit-profile`, editProfile);

  // } // end of updateProfile()

  // // find user by user id
  // findById(id: number): Observable<User> {

  //   return this.http.get<User>(`${this.host}/user-list/${id}`);

  // } // end of findById()

  // get list of posts by category id
  searchPosts(pageNumber: number, pageSize: number, categoryid: number): Observable<PostSearchResponse[]> {

    return this.http.get<PostSearchResponse[]>(
      `${this.host}/post-search?pageNumber=${pageNumber}&pageSize=${pageSize}&categoryid=${categoryid}`
    );

  } // end of searchPosts()

} // end of class PostService