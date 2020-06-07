import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormControl, FormGroup } from '@angular/forms';
import { first, debounceTime } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NOTIFICATIONS_MESSAGES } from '@constants/app-constants.constant';
import { UsersService } from '@services/users.service';
import { Subscription } from 'rxjs';
import { IUser } from '@interfaces/user.interface';
import * as countryCodes from 'country-codes-list';

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
  isPreview = false;
  title = 'Profile';
  countriesList = countryCodes.all();
  prefixList = countryCodes.all();
  currentAuthUser: any;
  user: IUser;

  userSub: Subscription;
  formSub: Subscription;

  public profileForm = this.fb.group({
    personal: this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('',  [Validators.required]),
      website: new FormControl(''),
      phonePrefix: new FormControl(''),
      phoneNumber: new FormControl(''),
      jobTitle: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl('')
    }),
    socials: this.fb.group({})
  });

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.currentAuthUser = this.authService.currentAuthValue;

    for ( let i = 0; i < this.prefixList.length; i++ ) {
      if ( !this.prefixList[ i ].countryCallingCode ) {
        this.prefixList.splice( i, 1 );
        i--;
      }
    }

    this.usersService
      .getUser(this.currentAuthUser._id)
      .pipe(first())
      .subscribe(
        (res: IUser) => {
          if (!!res) {
            console.log(res);
            this.user = res;
            this.user.countryName = this.getCountryName(this.user.country);
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
      website: this.user.website,
      jobTitle: this.user.jobTitle,
      phonePrefix: this.user.phonePrefix,
      phoneNumber: this.user.phoneNumber,
      city: this.user.city,
      country: this.user.country
    });

    this.user.socials.forEach((social, idx) => {
      (<FormGroup>this.profileForm.get('socials')).addControl(social.id, new FormControl(social.value));
    } );

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
          phonePrefix: this.profileForm.value.personal.phonePrefix,
          phoneNumber: this.profileForm.value.personal.phoneNumber,
          city: this.profileForm.value.personal.city,
          country: this.profileForm.value.personal.country,
          website: this.profileForm.value.personal.website,
          socials: []
        };

        this.user.socials.forEach( ( social: {id: string, value: string} ) => {
            obj.socials.push({
              id: social.id,
              value: this.profileForm.value.socials[ social.id ] || undefined
            });
        });

        this.usersService
          .updateUser(this.currentAuthUser._id, obj)
          .pipe(first())
          .subscribe(
            (res: any) => {
              if (!!res && res._id) {
                this.isLoading = false;
                this.user = res;
                this.user.countryName = this.getCountryName(this.user.country);

                // User update register
                this.snackBar.open(
                  `Your profile was successfully updated: ${res.firstName}`,
                  'Dismiss',
                  { duration: 2000 }
                );
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

  getCountryName( isoCode: string ) {
    return this.countriesList.find(country => country.countryCode === isoCode).countryNameEn;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToPreview(value) {
    this.title = value ? 'Preview' : 'Profile';
    this.isPreview = value;
  }

  ngOnDestroy() {
  }
}
