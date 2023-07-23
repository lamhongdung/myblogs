import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Editor, Toolbar } from 'ngx-editor';
import { NotificationType } from 'src/app/enum/NotificationType';
import { CustomHttpResponse } from 'src/app/payload/CustomHttpResponse';
import { AuthService } from 'src/app/service/auth.service';
import { ContactService } from 'src/app/service/contact.service';
import { CustomValidator } from 'src/app/validator/CustomValidator';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  // allow display spinner icon or not
  // =true: allow to display "spinner" in the "Send" button
  // =false: do not allow to display "spinner" in the "Send" button
  showSpinner: boolean = false;

  contactForm!: FormGroup;

  // error messages
  errorMessages = {
    name: [
      { type: 'required', message: 'Please input a name' },
      { type: 'allWhitespace', message: 'Name does not allow all white spaces' },
      { type: 'maxlength', message: 'Name cannot be longer than 100 characters' },
    ],
    email: [
      { type: 'required', message: 'Please input an email' },
      { type: 'pattern', message: 'Email is incorrect format' }
    ],
    phone: [
      { type: 'required', message: 'Please input phone number' },
      { type: 'pattern', message: 'Phone number must be 10 digits length' }
    ],
    company: [
      { type: 'required', message: 'Please input a company' },
      { type: 'allWhitespace', message: 'Company does not allow all white spaces' },
      { type: 'maxlength', message: 'Company cannot be longer than 100 characters' }
    ],
    message: [
      { type: 'required', message: 'Please input a message' },
      { type: 'allWhitespace', message: 'Message does not allow all white spaces' }
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

  constructor(
    private router: Router,
    private contactService: ContactService,
    private formBuilder: FormBuilder,
    private notifierService: NotifierService
  ) {
  }

  // this method ngOnInit() is run after the component "SendContactComponent" is constructed
  ngOnInit(): void {

    this.editor = new Editor();

    // initial form
    this.contactForm = this.formBuilder.group({

      // required and max length = 100 characters
      name: ['', [Validators.required, CustomValidator.allWhitespace, Validators.maxLength(100)]],

      // required and must be in correct format 
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],

      // required and length must be 10 digits
      phone: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],

      // max length = 100 characters
      company: ['', [Validators.required, CustomValidator.allWhitespace, Validators.maxLength(100)]],

      // required
      message: ['', [Validators.required, CustomValidator.allWhitespace]],

    });

  } // end of ngOnInit()

  // send contact.
  // when user clicks the "Send" button in the "Contact" screen.
  sendContact() {

    // allow to show spinner(circle)
    this.showSpinner = true;

    // send contact
    this.contactService.sendContact(this.contactForm.value)
      .subscribe({

        // send contact successful
        next: (data: CustomHttpResponse) => {

          // show successful message to user 
          this.sendNotification(NotificationType.SUCCESS, data.message);

          // hide spinner(circle)
          this.showSpinner = false;

          // navigate to the "post-list" page
          this.router.navigateByUrl("/post-list");
        },

        // send contact failure
        error: (errorResponse: HttpErrorResponse) => {

          // show the error message to user
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);

          // hide spinner(circle)
          this.showSpinner = false;
        }
      });

  } // end of sendContact()

  // send notification to user
  private sendNotification(notificationType: NotificationType, message: string): void {

    if (message) {
      this.notifierService.notify(notificationType, message);
    } else {
      this.notifierService.notify(notificationType, 'An error occurred. Please try again.');
    }

  } // end of sendNotification()

} // end of the SendContactComponent class