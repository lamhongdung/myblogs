import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { NotifierService } from 'angular-notifier';
import { Editor, Toolbar } from 'ngx-editor';
import { NotificationType } from 'src/app/enum/NotificationType';
import { CustomHttpResponse } from 'src/app/payload/CustomHttpResponse';
import { DropdownResponse } from 'src/app/payload/DropdownResponse';
import { PostEditViewResponse } from 'src/app/payload/PostEditViewResponse';
import { PostService } from 'src/app/service/post.service';
import { CustomValidator } from 'src/app/validator/CustomValidator';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent {

  // allow display spinner icon or not
  // =true: allow to display spinner in the "Publish" button
  // =false: do not allow to display spinner in the "Publish" button
  showSpinnerPublish: boolean = false;

  // allow display spinner icon or not
  // =true: allow to display spinner in the "Delete" button
  // =false: do not allow to display spinner in the "Delete" button
  showSpinnerDelete: boolean = false;

  postForm!: FormGroup;

  // post id
  postid: number = 0;

  // all active categories
  categories: DropdownResponse[] = [];

  // response data from backend
  postEditViewResponse!: PostEditViewResponse;

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

  // Rich text editor contains ticket content
  editor!: Editor;

  // toolbar of rich text editor
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


  constructor(
    private router: Router,
    private postService: PostService,
    private notifierService: NotifierService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private confirmBoxEvokeService: ConfirmBoxEvokeService

  ) {

  }

  // initial values
  ngOnInit(): void {

    // 
    this.editor = new Editor();

    this.postForm = this.formBuilder.group(
      {

        postid: [''],

        // creator id + email
        creator: [''],

        title: ['', [Validators.required, CustomValidator.allWhitespace, Validators.maxLength(100)]],

        content: ['', [Validators.required]],

        // Post was created on this datetime
        createDatetime: [''],

        // last time the post was updated
        lastUpdateDatetime: [''],

        // required and value must be >= 1
        categoryid: ['', [Validators.required, Validators.min(1)]],

      }
    ); // end of initial values for "postForm" form

    // get post id from params of active route(from address bar).
    // and then get post based on post id from database
    this.activatedRoute.paramMap.subscribe({

      next: (params: ParamMap) => {

        // get id from param of active route.
        // The "+"" sign: convert string to number. 
        this.postid = +params.get('id')!;

        // get post by post id
        this.postService.findById(this.postid).subscribe({

          // get data successful from database
          next: (data: PostEditViewResponse) => {

            this.postEditViewResponse = data;

            // load post information to the postForm
            this.postForm.patchValue(data);

            // convert UTC to local time
            this.postForm.get("createDatetime")?.patchValue(
              formatDate(data.createDatetime.toLocaleString(), "yyyy-MM-dd HH:mm:ss", "en-US"));
            this.postForm.get("lastUpdateDatetime")?.patchValue(
              formatDate(data.lastUpdateDatetime.toLocaleString(), "yyyy-MM-dd HH:mm:ss", "en-US"));

          },

          // there are some errors when get post by post id
          error: (errorResponse: HttpErrorResponse) => {

            this.sendNotification(NotificationType.ERROR, errorResponse.error.message);

          }
        }); // end of this.postService.findById()

      },

      // there are some errors when get id from address bar
      error: (errorResponse: HttpErrorResponse) => {

        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);

      }

    });

    // load posible values for categories dropdowns:
    this.loadCategoriesDropdown();

  } // end of ngOnInit()

  // initialize default values for the categories dropdown
  loadCategoriesDropdown() {

    // load all active categories into the "Category" dropdown
    this.loadAllActiveCategories();

  } // end of loadCategoriesDropdown()

  // edit post.
  // when user clicks the "Publish" button in the "Edit post"
  editPost() {

    // allow to show spinner(circle)
    this.showSpinnerPublish = true;

    // edit existing post
    this.postService.editPost(this.postForm.value).subscribe({

      // update post successful
      next: (data: CustomHttpResponse) => {

        // send notification to user
        this.sendNotification(NotificationType.SUCCESS, data.message);

        // hide spinner(circle)
        this.showSpinnerPublish = false;

        // after update post successful then navigate to the "post-list" page
        this.router.navigateByUrl("/post-list");

      },

      // there are some errors when update post
      error: (errorResponse: HttpErrorResponse) => {

        // send failure message to user
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);

        // hide spinner(circle)
        this.showSpinnerPublish = false;
      }
    });


  } // end of editPost()

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

  // delete post
  deletePost(postid: number) {

    this.confirmBoxEvokeService.danger(
      `Delete post`, `Do you want to delete the post with id = ${postid} ?`, `Yes`, `No`
    )
      .subscribe({

        // user confirmed to delete
        next: resp => {

          // if user clicks on the 'Yes' button
          if (resp.clickedButtonID == 'yes') {

            this.showSpinnerDelete = true;

            // delete existing post
            this.postService.deletePost(postid).subscribe({

              // deleted post successful
              next: (data: CustomHttpResponse) => {

                // send notification to user
                this.sendNotification(NotificationType.SUCCESS, data.message);

                // hide spinner(circle)
                this.showSpinnerDelete = false;

                // after delete post successful then navigate to the "post-list" page
                this.router.navigateByUrl("/post-list");

              },

              // there are some errors when delete post
              error: (errorResponse: HttpErrorResponse) => {

                // send failure message to user
                this.sendNotification(NotificationType.ERROR, errorResponse.error.message);

                // hide spinner(circle)
                this.showSpinnerDelete = false;
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

} // end of the PostEditComponent