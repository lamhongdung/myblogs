import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostSearchResponse } from '../payload/PostSearchResponse';
import { CategorySidebar } from '../payload/CategorySidebar';

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

  // calculate total posts(total elements)
  getTotalProducts(categoryid: number): Observable<number> {

    return this.http.get<number>(
      `${this.host}/post-total-elements?categoryid=${categoryid}`
    );

  } // end of getTotalProducts()

  // get number of posts of each category
  getCategoriesSidebar(): Observable<CategorySidebar[]> {

    return this.http.get<CategorySidebar[]>(
      `${this.host}/category-sidebar`
    );

  } // end of getCategoriesSidebar()

} // end of class PostService