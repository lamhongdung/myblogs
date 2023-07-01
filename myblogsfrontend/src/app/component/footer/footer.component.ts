import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NotificationType } from 'src/app/enum/NotificationType';
import { CategorySidebar } from 'src/app/payload/CategorySidebar';
import { PostSearchResponse } from 'src/app/payload/PostSearchResponse';
import { AuthService } from 'src/app/service/auth.service';
import { PostService } from 'src/app/service/post.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  // user id.
  // - userid = 0: user has not yet logged in the system.
  // - userid > 0: user already logged in the system.
  userid: number = 0;

  // list of posts
  posts: PostSearchResponse[] = [];

  // number of posts of each category
  categoriesSidebar: CategorySidebar[] = [];
  categorySidebar!: CategorySidebar;

  // category id.
  // =0: means all categories.
  categoryid: number = 0;

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

  constructor(

    private notifierService: NotifierService,
    private postService: PostService,
    private authService: AuthService

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

    // list of posts by category id
    this.searchPosts(1, 3, 0);

    // categories sidebar
    this.getCategoriesSidebar();



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

    // // get total posts(total elements)
    // this.postService.getTotalPosts(categoryid)

    //   .subscribe({

    //     // get total posts successful
    //     next: (data: number) => {

    //       // total products
    //       this.theTotalElements = data;

    //     },

    //     // there are some errors when get total posts
    //     error: (errorResponse: HttpErrorResponse) => {

    //       // show the error message to user
    //       this.sendNotification(NotificationType.ERROR, errorResponse.error.message);

    //     }
    //   });

  } // end of searchPosts()

  // get number of posts of each category
  getCategoriesSidebar() {

    // get number of posts of each category
    this.postService.getCategoriesSidebar()

      .subscribe({

        // get list of posts by category id successful
        next: (data: CategorySidebar[]) => {

          this.categoriesSidebar = data

          this.categorySidebar = this.categoriesSidebar.find(tempCategorySidebar => tempCategorySidebar.id === this.categoryid)!;
          this.theTotalElements = this.categorySidebar?.numOfPosts;
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
    this.searchPosts(this.thePageNumber, this.thePageSize, this.categoryid)

  } // end of updatePageSize()

  // add product to cart
  // addToCart(theProduct: Product) {

  //   console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

  //   // create new cartItem with quantity = 1
  //   const theCartItem = new CartItem(theProduct);

  //   // add cartItem to cart
  //   this.cartService.addToCart(theCartItem);

  // } // end of addToCart()

  // send notification to user
  private sendNotification(notificationType: NotificationType, message: string): void {

    if (message) {
      this.notifierService.notify(notificationType, message);
    } else {
      this.notifierService.notify(notificationType, 'An error occurred. Please try again.');
    }

  } // end of sendNotification()

} // end of class ProductListComponent