import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NotificationType } from 'src/app/enum/NotificationType';
import { PostEditViewResponse } from 'src/app/payload/PostEditViewResponse';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent {

  // post id
  postid: number = 0;

  // response data from backend
  post!: PostEditViewResponse;

  constructor(

    private router: Router,
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private notifierService: NotifierService

  ) {

  }

  // initial values
  ngOnInit(): void {

    // get post id from params of active route(from address bar).
    // and then get post based on post id from database
    this.activatedRoute.paramMap.subscribe({

      next: (params: ParamMap) => {

        // get id from param of active route.
        // The "+"" sign: convert string to number. 
        this.postid = +params.get('id')!;

        // get post by post id
        this.postService.findById(this.postid)
          .subscribe({

            // get data successful from database
            next: (data: PostEditViewResponse) => {

              this.post = data;

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

  } // end of ngOnInit()

  // send notification to user
  private sendNotification(notificationType: NotificationType, message: string): void {

    if (message) {
      this.notifierService.notify(notificationType, message);
    } else {
      this.notifierService.notify(notificationType, 'An error occurred. Please try again.');
    }

  } // end of sendNotification()


} // end of the PostViewComponent
