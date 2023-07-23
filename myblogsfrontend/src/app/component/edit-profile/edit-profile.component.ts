import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NotificationType } from 'src/app/enum/NotificationType';
import { CustomHttpResponse } from 'src/app/payload/CustomHttpResponse';
import { EditProfile } from 'src/app/payload/EditProfile';
import { User } from 'src/app/payload/User';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { CustomValidator } from 'src/app/validator/CustomValidator';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  // allow display spinner icon or not
  // =true: allow to display spinner in the "Save" button
  // =false: does not allow to display spinner in the "Save" button
  showSpinner: boolean = false;

  // editProfileForm has 5 fields:
  //  - id(read only)
  //  - Email(read only)
  //  - First name
  //  - Last name
  //  - Phone
  //  - address
  editProfileForm!: FormGroup;

  // EditProfile payload
  editProfile!: EditProfile;

  // CustomHttpResponse payload
  response!: CustomHttpResponse;

  // email of the logged in user
  loggedInEmail: string = "";

  // user id of the logged in user.
  // =0: user has not yet logged in the system.
  // >0: user already logged in the system
  userId: number = 0;

  // user role
  userRole: string = "";

  // error messages
  errorMessages = {
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
      { type: 'allWhitespace', message: 'Address does not allow all white spaces' },
      { type: 'maxlength', message: 'Address cannot be longer than 100 characters' }
    ]
  };

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notifierService: NotifierService
  ) { }

  // this method ngOnInit() is run after the component "EditProfileComponent" is constructed
  ngOnInit(): void {

    // get email of the logged-in user
    this.loggedInEmail = this.authService.getEmailFromLocalStorage();

    // get user id of the logged-in user.
    // the "+" sign: use to convert string to number
    this.userId = +this.authService.getIdFromLocalStorage();

    // get user role(ROLE_USER)
    this.userRole = this.authService.getRoleFromLocalStorage();

    // initial form
    this.initForm();

    // get user by user id for load existing user to form
    this.userService.findById(this.userId)
      .subscribe({

        // get user successful
        next: (data: User) => {

          // create new editProfile object
          this.editProfile = new EditProfile(
            +data.id, data.email, data.firstName, data.lastName, data.phone, data.address);

          // load user information to the editProfileForm
          this.editProfileForm.patchValue(this.editProfile);

        },

        // there are some errors when get user from database 
        error: (errorResponse: HttpErrorResponse) => {
          // show error message to user
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      });

  } // end of ngOnInit()

  // initial form
  initForm() {

    // 'edit profile' form
    this.editProfileForm = this.formBuilder.group(
      {
        id: [''],

        email: [''],

        firstName: ['',
          [Validators.required, CustomValidator.allWhitespace, Validators.maxLength(50)]],
        lastName: ['',
          [Validators.required, CustomValidator.allWhitespace, Validators.maxLength(50)]],
        phone: ['',
          [Validators.required, Validators.pattern("^[0-9]{10}$")]],
        address: ['',
          [CustomValidator.allWhitespace, Validators.maxLength(100)]],
      }
    );
  } // end of initForm()

  // update profile.
  // when user clicks the "Save" button in the "Edit profile" screen
  updateProfile(): void {

    // allow display spinner icon
    this.showSpinner = true;

    // update profile
    this.userService.updateProfile(this.editProfileForm.value)
      .subscribe({

        // update profile successful
        next: (user: User) => {

          // show successful message to user 
          this.sendNotification(
            NotificationType.SUCCESS, `${user.lastName} ${user.firstName} is updated successfully`);

          // hide spinner(circle)
          this.showSpinner = false;

          // re-direct to the "post-list" page
          this.router.navigateByUrl("/post-list");

        },

        // update profile failure
        error: (errorResponse: HttpErrorResponse) => {

          // show the error message to user
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);

          // hide spinner(circle)
          this.showSpinner = false;
        }
      });

  } // end of updateProfile()

  // send notification to user
  private sendNotification(notificationType: NotificationType, message: string): void {

    if (message) {
      this.notifierService.notify(notificationType, message);
    } else {
      this.notifierService.notify(notificationType, 'An error occurred. Please try again.');
    }

  } // end of sendNotification()

} // end of the EditProfileComponent class
