import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostSearchResponse } from '../payload/PostSearchResponse';
import { CategorySidebar } from '../payload/CategorySidebar';
import { DropdownResponse } from '../payload/DropdownResponse';
import { CustomHttpResponse } from '../payload/CustomHttpResponse';
import { PostCreateRequest } from '../payload/PostCreateRequest';
import { PostEditRequest } from '../payload/PostEditRequest';
import { PostEditViewResponse } from '../payload/PostEditViewResponse';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  // 'http://localhost:8080'
  host = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }


  // get list of posts by category id
  searchPosts(pageNumber: number, pageSize: number, categoryid: number): Observable<PostSearchResponse[]> {

    return this.http.get<PostSearchResponse[]>(
      `${this.host}/post-search?pageNumber=${pageNumber}&pageSize=${pageSize}&categoryid=${categoryid}`
    );

  } // end of searchPosts()

  // get all active categories
  getAllActiveCategories(): Observable<DropdownResponse[]> {

    return this.http.get<DropdownResponse[]>(
      `${this.host}/category-active`
    )

  } // end of getAllActiveCategories()

  // create a new post
  public createPost(postCreateRequest: PostCreateRequest): Observable<CustomHttpResponse> {

    return this.http.post<CustomHttpResponse>(`${this.host}/post-create`, postCreateRequest);

  } // end of createPost()

  // edit an existing post
  public editPost(postEditRequest: PostEditRequest): Observable<CustomHttpResponse> {

    return this.http.put<CustomHttpResponse>(`${this.host}/post-edit`, postEditRequest);

  } // end of editPost()

  // find post by id
  findById(id: number): Observable<PostEditViewResponse> {

    return this.http.get<PostEditViewResponse>(`${this.host}/post-list/${id}`);

  } // end of findById()

  // get number of posts of each category
  getCategoriesSidebar(): Observable<CategorySidebar[]> {

    return this.http.get<CategorySidebar[]>(
      `${this.host}/category-sidebar`
    );

  } // end of getCategoriesSidebar()

} // end of class PostService