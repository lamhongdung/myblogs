import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NotificationType } from 'src/app/enum/NotificationType';
import { User } from 'src/app/payload/User';
import { UserService } from 'src/app/service/user.service';
import { CustomValidator } from 'src/app/validator/CustomValidator';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  // allow display spinner icon or not
  // =true: allow to display spinner in the "Save" button
  // =false: do not allow to display spinner in the "Save" button
  showSpinner: boolean = false;

  userForm!: FormGroup;
  user: User | undefined;

  errorMessages = {
    email: [
      { type: 'required', message: 'Please input an email' },
      { type: 'pattern', message: 'Email is incorrect format' }
    ],
    password: [
      { type: 'required', message: 'Please input a password' }
    ],
    firstName: [
      { type: 'required', message: 'Please input the first name' },
      { type: 'allWhitespace', message: 'First name does not allow all white spaces' },
      { type: 'maxlength', message: 'First name cannot be longer than 50 characters' },
    ],
    lastName: [
      { type: 'required', message: 'Please input the last name' },
      { type: 'allWhitespace', message: 'Last name does not allow all white spaces' },
      { type: 'maxlength', message: 'Last name cannot be longer than 50 characters' },
    ],
    phone: [
      { type: 'required', message: 'Please input phone number' },
      { type: 'pattern', message: 'Phone number must be 10 digits length' }
    ],
    address: [
      { type: 'allWhitespace', message: 'Shipping address does not allow all white spaces' },
      { type: 'maxlength', message: 'Shipping Address cannot be longer than 100 characters' }
    ]
  };

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private notifierService: NotifierService
  ) { }

  // this method ngOnInit() is run after the component "UserCreateComponent" is constructed
  ngOnInit(): void {

    // initial form
    this.initForm();

  } // end of ngOnInit()

  // initial form
  initForm() {

    this.userForm = this.formBuilder.group({

      // required and must be in correct format 
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],

      // required 
      password: ['', [Validators.required]],

      // required and max length = 50 characters
      firstName: ['', [Validators.required, CustomValidator.allWhitespace, Validators.maxLength(50)]],

      // required and max length = 50 characters
      lastName: ['', [Validators.required, CustomValidator.allWhitespace, Validators.maxLength(50)]],

      // required and length must be 10 digits
      phone: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],

      // max length = 100 characters
      address: ['', [CustomValidator.allWhitespace, Validators.maxLength(100)]],

    });

  } // end of initForm()

  // create user(customer).
  // when user clicks the "Save" button in the "Sign up" screen
  createUser() {

    // allow to show spinner(circle)
    this.showSpinner = true;

    // create user
    this.userService.createUser(this.userForm.value)
      .subscribe({

        // create user successful
        next: (data: User) => {

          this.user = data;

          // show successful message to user 
          this.sendNotification(NotificationType.SUCCESS,
            `${data.lastName} ${data.firstName} is created successfully`);
          // this.notifierService.notify(NotificationType.SUCCESS,
          //   `${data.lastName} ${data.firstName} is created successfully`);

          // hide spinner(circle)
          this.showSpinner = false;

          // navigate to the "/login" page
          this.router.navigateByUrl("/login");
        },

        // create user failure(ex: email already existed,...)
        error: (errorResponse: HttpErrorResponse) => {

          // show the error message to user
          this.notifierService.notify(NotificationType.ERROR, errorResponse.error.message);

          // hide spinner(circle)
          this.showSpinner = false;
        }
      });

  } // end of createUser()

  // send notification to user
  private sendNotification(notificationType: NotificationType, message: string): void {

    if (message) {
      this.notifierService.notify(notificationType, message);
    } else {
      this.notifierService.notify(notificationType, 'An error occurred. Please try again.');
    }

  } // end of sendNotification()

} // end of the UserCreateComponent class
