import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { NotifierService } from 'angular-notifier';
import { NotificationType } from 'src/app/enum/NotificationType';
import { CategorySidebar } from 'src/app/payload/CategorySidebar';
import { CustomHttpResponse } from 'src/app/payload/CustomHttpResponse';
import { PostSearchResponse } from 'src/app/payload/PostSearchResponse';
import { AuthService } from 'src/app/service/auth.service';
import { PostService } from 'src/app/service/post.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  // user id.
  // - userid = 0: user has not yet logged in the system.
  // - userid > 0: user already logged in the system.
  userid: number = 0;

  // list of posts
  posts: PostSearchResponse[] = [];

  // number of posts of each category
  sidebarMenu: CategorySidebar[] = [];
  sidebarItem!: CategorySidebar;

  // current category id.
  // =0: means all categories.
  currentCategoryid: number = 0;

  // previous category id.
  // =0: means all categories.
  previousCategoryid: number = 0;

  //
  // properties for pagination
  //

  // current page
  thePageNumber: number = 1;

  // thePageSize = 3;
  thePageSize: number = environment.pageSize;

  // initial page size of 'pageSize' dropdown
  thePageSizeInit: number = environment.pageSize;

  // total posts based on category id
  theTotalElements: number = 0;

  hasCategoryid: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private notifierService: NotifierService,
    private postService: PostService,
    private authService: AuthService,
    private confirmBoxEvokeService: ConfirmBoxEvokeService

  ) {
  }

  // ngOnInit() is similar to @PostConstruct
  ngOnInit() {

    // get userid from local storage
    this.userid = +this.authService.getIdFromLocalStorage();

    // publish userid to all subscribers
    this.authService.userid.next(this.userid);
    // refresh value of userid
    this.authService.userid
      .subscribe(
        data => this.userid = data
      )

    // when URL is changed then execute these commands
    this.activatedRoute.paramMap
      .subscribe(() => {

        // check whether there is parameter 'id' in URL or not?
        this.hasCategoryid = this.activatedRoute.snapshot.paramMap.has('id');

        // if there is parameter 'id' in URL.
        // it means user clicked on menu of 'Category sidebar'
        if (this.hasCategoryid) {

          // get the "id" param string. convert string to a number using the "+" symbol
          this.currentCategoryid = +this.activatedRoute.snapshot.paramMap.get('id')!;

          // if user changes category id
          if (this.currentCategoryid != this.previousCategoryid) {
            this.thePageNumber = 1;
          }

        }

        console.log(`thePageNumber: ${this.thePageNumber}, thePageSize: ${this.thePageSize}, categoryid: ${this.currentCategoryid}`);

        // list of posts by category id
        this.searchPosts(this.thePageNumber, this.thePageSize, this.currentCategoryid);

        // categories sidebar
        this.getCategoriesSidebar();

      });

  } // end of ngOnInit()

  // get products, total products
  searchPosts(pageNumber: number, pageSize: number, categoryid: number) {

    // get products
    this.postService.searchPosts((pageNumber - 1) * pageSize, pageSize, categoryid)

      .subscribe({

        // get list of posts by category id successful
        next: (data: PostSearchResponse[]) => {

          return this.posts = data

        },

        // there are some errors when get products
        error: (errorResponse: HttpErrorResponse) => {

          // show the error message to user
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);

        }
      });

  } // end of searchPosts()

  // get number of posts of each category
  getCategoriesSidebar() {

    // get number of posts of each category
    this.postService.getCategoriesSidebar()

      .subscribe({

        // get list of posts by category id successful
        next: (data: CategorySidebar[]) => {

          this.sidebarMenu = data

          this.sidebarItem = this.sidebarMenu.find(tempCategorySidebar => tempCategorySidebar.id === this.currentCategoryid)!;
          this.theTotalElements = this.sidebarItem?.numOfPosts;
          console.log(`theTotalElements: ${this.theTotalElements}`);

        },

        // there are some errors when get products
        error: (errorResponse: HttpErrorResponse) => {

          // show the error message to user
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);

        }
      });

  } // end of getCategoriesSidebar()

  // when user selects the dropdown 'PageSize' then update its page size
  updatePageSize(pageSize: number) {

    // update new page size
    this.thePageSize = pageSize;

    // reset page number to 1
    this.thePageNumber = 1;

    // search products
    this.searchPosts(this.thePageNumber, this.thePageSize, this.currentCategoryid)

  } // end of updatePageSize()

  // delete post
  deletePost(postid: number) {

    this.confirmBoxEvokeService.danger(
      `Delete post`, `Do you want to delete the post with id = ${postid} ?`, `Yes`, `No`
    )
      .subscribe({

        // user confirmed to delete
        next: resp => {

          if (resp.clickedButtonID == 'yes') {

            // delete exsting post
            this.postService.deletePost(postid).subscribe({

              // deleted post successful
              next: (data: CustomHttpResponse) => {

                // send notification to user
                this.sendNotification(NotificationType.SUCCESS, data.message);

                // reload the screen
                window.location.reload();

              },

              // there are some errors when delete post
              error: (errorResponse: HttpErrorResponse) => {

                // send failure message to user
                this.sendNotification(NotificationType.ERROR, errorResponse.error.message);

              }
            });

          }
        }
      });

  } // end of deletePost()

  // send notification to user
  private sendNotification(notificationType: NotificationType, message: string): void {

    if (message) {
      this.notifierService.notify(notificationType, message);
    } else {
      this.notifierService.notify(notificationType, 'An error occurred. Please try again.');
    }

  } // end of sendNotification()

} // end of class ProductListComponent