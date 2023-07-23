import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Editor, Toolbar } from 'ngx-editor';
import { NotificationType } from 'src/app/enum/NotificationType';
import { CustomHttpResponse } from 'src/app/payload/CustomHttpResponse';
import { DropdownResponse } from 'src/app/payload/DropdownResponse';
import { AuthService } from 'src/app/service/auth.service';
import { PostService } from 'src/app/service/post.service';
import { CustomValidator } from 'src/app/validator/CustomValidator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  // allow display spinner icon or not
  // =true: allow to display "spinner" in the "Publish" button
  // =false: do not allow to display "spinner" in the "Publish" button
  showSpinner: boolean = false;

  postForm!: FormGroup;

  // error messages
  errorMessages = {
    title: [
      { type: 'required', message: 'Please input a title' },
      { type: 'allWhitespace', message: 'Title does not allow all white spaces' },
      { type: 'maxlength', message: 'Title cannot be longer than 100 characters' },
    ],
    categoryid: [
      { type: 'required', message: 'Please select a category' }
    ],
    content: [
      { type: 'required', message: 'Please input a content' }
      // { type: 'allWhitespace', message: 'Content does not allow all white spaces' }
    ],
  };

  editor!: Editor;

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    // ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    ['text_color', 'background_color'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    // ['link', 'image'],
    // ['align_left', 'align_center', 'align_right', 'align_justify'],
    // ['horizontal_rule', 'format_clear'],
  ];

  // user id who has logged in the system.
  // =0: Guest user.
  // >0: specific user.
  userid: number = 0;

  // all active categories
  categories: DropdownResponse[] = [];

  constructor(
    private router: Router,
    private postService: PostService,
    private formBuilder: FormBuilder,
    private notifierService: NotifierService,
    private authService: AuthService,
  ) {
  }

  // this method ngOnInit() is run after the component "PostCreateComponent" is constructed
  ngOnInit(): void {

    this.editor = new Editor();

    // initial form
    this.postForm = this.formBuilder.group(
      {
        // those who creates post
        creatorid: [+this.authService.getIdFromLocalStorage()],

        // required and max length = 100 characters
        title: ['', [Validators.required, CustomValidator.allWhitespace, Validators.maxLength(100)]],

        // required
        categoryid: ['', [Validators.required]],

        // required
        content: ['', [Validators.required]],

      }
    );

    // load posible values for categories dropdowns:
    this.loadCategoriesDropdown();

  } // end of ngOnInit()

  // initialize default values for the categories dropdown
  loadCategoriesDropdown() {

    // load all active categories into the "Category" dropdown
    this.loadAllActiveCategories();


  } // end of loadCategoriesDropdown()


  // create post.
  // when user clicks the "Publish" button in the "Create post" screen.
  createPost() {

    // allow to show spinner(circle)
    this.showSpinner = true;

    // create post
    this.postService.createPost(this.postForm.value)
      .subscribe({

        // create post successful
        next: (data: CustomHttpResponse) => {

          // show successful message to user 
          this.sendNotification(NotificationType.SUCCESS, data.message);

          // hide spinner(circle)
          this.showSpinner = false;

          // navigate to the "post-list" page
          this.router.navigateByUrl("/post-list");
        },

        // create post failure
        error: (errorResponse: HttpErrorResponse) => {

          // show the error message to user
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);

          // hide spinner(circle)
          this.showSpinner = false;
        }
      });

  } // end of createPost()

  // load all active categories
  loadAllActiveCategories() {

    // get all active categories
    this.postService.getAllActiveCategories()

      .subscribe({

        // get all active categories successful
        next: (data: DropdownResponse[]) => {

          // all active categories
          this.categories = data;

        },

        // there are some errors when get teams
        error: (errorResponse: HttpErrorResponse) => {

          // show the error message to user
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);

        }
      });

  } // end of loadAllActiveCategories()

  // send notification to user
  private sendNotification(notificationType: NotificationType, message: string): void {

    if (message) {
      this.notifierService.notify(notificationType, message);
    } else {
      this.notifierService.notify(notificationType, 'An error occurred. Please try again.');
    }

  } // end of sendNotification()

} // end of the PostCreateComponent class