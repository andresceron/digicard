import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { first, debounceTime } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NOTIFICATIONS_MESSAGES } from '@constants/app-constants.constant';
import { UsersService } from '@services/users.service';
import { Subscription } from 'rxjs';
import { IUser } from '@interfaces/user.interface';

@Component({
  selector: 'sc-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit, OnDestroy {
  submitError: boolean;
  formHasError: boolean;
  formErrorEmail = 'Invalid email';
  showPassword = false;
  isLoading = false;
  currentAuthUser: any;
  user: IUser;

  userSub: Subscription;
  formSub: Subscription;

  public profileForm = this.fb.group({
    personal: this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('',  [Validators.required]),
      jobTitle: new FormControl(''),
      phoneNumber: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl('')
    }),
    socials: this.fb.group({
      behance: new FormControl( '' ),
      facebook: new FormControl(''),
      github: new FormControl(''),
      instagram: new FormControl(''),
      linkedin: new FormControl(''),
      pinterest: new FormControl(''),
      skype: new FormControl(''),
      snapchat: new FormControl(''),
      spotify: new FormControl(''),
      tiktok: new FormControl(''),
      tumblr: new FormControl(''),
      twitter: new FormControl(''),
      vimeo: new FormControl(''),
      whatsapp: new FormControl(''),
      youtube: new FormControl('')
    })
  });

  // public profileFormGroup: FormGroup = this.fb.group({
  //   firstName: ['', [Validators.required]],
  //   lastName: ['', [Validators.required]],
  //   email: ['', [Validators.required, , Validators.email]],
  //   password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
  //   confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
  // }, {validator: ConfirmPasswordValidator.MatchPassword});

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.currentAuthUser = this.authService.currentAuthValue;

    this.usersService
      .getUser(this.currentAuthUser._id)
      .pipe(first())
      .subscribe(
        (res: IUser) => {
          if (!!res) {
            console.log(res);
            this.user = res;
            this.isLoading = false;
            this.configForm();
          }
        },
        (err) => {
          console.log( 'err!', err );
        }
      );
  }

  configForm() {
    console.log( this.user );

    this.profileForm.get('personal').patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      jobTitle: this.user.jobTitle,
      phoneNumber: this.user.phoneNumber,
      city: this.user.city,
      country: this.user.country
    });

    this.user.socials.forEach((social) => {
      console.log(social);
      this.profileForm.get('socials').get(social.key).patchValue( social.value );
    });

    this.profileForm.get('personal').updateValueAndValidity();
    this.profileForm.get('socials').updateValueAndValidity();
  }

  onSubmit() {
    console.log( this.profileForm.value );
    console.log( this.profileForm );
    if (this.profileForm.valid) {
      try {
        this.submitError = false;
        this.isLoading = true;

        const obj = {
          firstName: this.profileForm.value.personal.firstName,
          lastName: this.profileForm.value.personal.lastName,
          email: this.profileForm.value.personal.email,
          jobTitle: this.profileForm.value.personal.jobTitle,
          phoneNumber: this.profileForm.value.personal.phoneNumber,
          city: this.profileForm.value.personal.city,
          country: this.profileForm.value.personal.country,
          socials: []
        };

        this.user.socials.forEach((test, key) => {
          console.log('test ', test, key);
        });

        // Object.values(this.profileForm.value.socials);
        // this.profileForm.value.socials.forEach( acc => {
        //   console.log( acc );
        // });

        this.usersService
          .updateUser(this.currentAuthUser._id, obj)
          .pipe(first())
          .subscribe(
            (res: any) => {
              if (!!res && res._id) {
                console.log(res);
                this.isLoading = false;

                // User update register
                this.snackBar.open(
                  `Thank you for registering: ${res.email}`,
                  'Dismiss',
                  { duration: 3000 }
                );

                // setTimeout(() => {
                //   this.router.navigate(['/login']);
                // }, 2000);
              }
            },
            (err) => {
              console.warn('register: ', err);
              this.isLoading = false;
              this.submitError = true;
              this.snackBar.open(NOTIFICATIONS_MESSAGES.REGISTER_ERROR, 'Dismiss', {
                duration: 3000
              });
          });
      } catch (err) {
        console.log(err);
      }
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
  }
}
