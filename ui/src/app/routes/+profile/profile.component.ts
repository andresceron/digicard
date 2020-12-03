import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, first } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NOTIFICATIONS_MESSAGES, REG_EXP_PATTERNS } from '@constants/app-constants.constant';
import { UsersService } from '@services/users.service';
import { Subscription } from 'rxjs';
import { IUser } from '@interfaces/user.interface';
import * as countryCodes from 'country-codes-list';
import { SafeResourceUrl } from '@angular/platform-browser';
import { UploadService } from '@services/upload.service';

@Component({
  selector: 'sc-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
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

  socialReplacePattern = new RegExp(REG_EXP_PATTERNS.SOCIAL_REPLACE);

  isUploadingImage = false;
  imageS3Path: string;
  progress = 0;
  imagePreview: SafeResourceUrl;

  userSub: Subscription;
  formSub: Subscription;

  public profileForm = this.fb.group({
    personal: this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      website: new FormControl(''),
      phonePrefix: new FormControl(''),
      phoneNumber: new FormControl(''),
      jobTitle: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl(''),
      image: new FormControl()
    }),
    socials: this.fb.group({})
  });

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private uploadService: UploadService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.currentAuthUser = this.authService.currentAuthValue;

    this.configPrefixList();
    this.initSubscriptions();
  }

  public imageFileEvent(event) {
    this.isUploadingImage = true;
    // const reader = new FileReader();
    // reader.onload = (e: any) => {
    //   console.log( e.target.result );
    //   this.imagePreview = e.target.result;
    // };

    // reader.readAsDataURL( event );

    try {
      this.uploadService
        .upload('data[image]', event)
        .pipe(first())
        .subscribe(
          (res: any) => {
            if (!!res) {
              this.isUploadingImage = false;
              this.profileForm.get('personal').get('image').patchValue(res);
              this.profileForm.get('personal').get('image').updateValueAndValidity();
              this.user.image = res;
            }
          },
          (err) => {
            console.warn('register: ', err);
            this.isUploadingImage = false;
          }
        );
    } catch (err) {
      this.isUploadingImage = false;
      console.log(err);
    }
  }

  public onSubmit() {
    if (!this.profileForm.valid) {
      return;
    }

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
        image: this.profileForm.value.personal.image,
        socials: []
      };

      this.user.socials.forEach((social: { id: string; value: string; baseUrl: string }) => {
        obj.socials.push({
          id: social.id,
          baseUrl: social.baseUrl,
          value: this.profileForm.value.socials[social.id] || undefined
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
              this.snackBar.open(NOTIFICATIONS_MESSAGES.PROFILE_UPDATE_SUCCESS, 'Dismiss', { duration: 5000 });
            }
          },
          (err) => {
            console.warn('register: ', err);
            this.isLoading = false;
            this.submitError = true;
            this.snackBar.open(NOTIFICATIONS_MESSAGES.PROFILE_UPDATE_ERROR, 'Dismiss', {
              duration: 5000
            });
          }
        );
    } catch (err) {
      console.log(err);
    }
  }

  public showPreview(value) {
    this.title = value ? 'Preview' : 'Profile';
    this.isPreview = value;
  }

  public removeAvatar() {
    this.profileForm.get('socials').patchValue({ image: null });
    this.profileForm.get('socials').updateValueAndValidity();
    this.user.image = null;
  }

  private initSubscriptions() {
    this.usersService
      .getUser(this.currentAuthUser._id)
      .pipe(first())
      .subscribe(
        (res: IUser) => {
          if (!!res) {
            this.user = res;
            this.user.countryName = this.user.country ? this.getCountryName(this.user.country) : undefined;
            this.isLoading = false;
            this.configForm();
            this.configSocialUrls(this.user.socials);
          }
        },
        (err: any) => {
          console.log('err!', err);
          this.isLoading = false;
        }
      );

    this.profileForm.controls.personal.valueChanges
      .pipe(
        debounceTime(500)
      ).subscribe((data) => {
        this.user = { ...this.user, ...data };
      });

    this.profileForm.controls.socials.valueChanges
      .pipe(
        debounceTime(500)
      ).subscribe((data) => {
        this.updateSocialUrls(data);
      });
  }

  private configSocialUrls(socials) {
    socials.forEach((social) => {
      if (!social.value) {
        return;
      }

      social.fullUrl = social.baseUrl.replace(this.socialReplacePattern, social.value);
    });
  }

  private updateSocialUrls(socials) {
    Object.entries(socials).forEach(([key, value]: [string, string]) => {
      if (!value) {
        return;
      }

      this.user.socials.forEach(social => {
        if (social.id === key) {
          social.value = value;
          social.fullUrl = social.baseUrl.replace(this.socialReplacePattern, social.value);
        }
      });
    });
  }

  private configForm() {
    this.profileForm.get('personal').patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      website: this.user.website,
      jobTitle: this.user.jobTitle,
      phonePrefix: this.user.phonePrefix,
      phoneNumber: this.user.phoneNumber,
      city: this.user.city,
      country: this.user.country,
      image: this.user.image
    });

    this.user.socials.forEach((social, idx) => {
      (<FormGroup>this.profileForm.get('socials')).addControl(social.id, new FormControl(social.value));
    });

    this.profileForm.get('personal').updateValueAndValidity();
    this.profileForm.get('socials').updateValueAndValidity();
  }

  private configPrefixList() {
    for (let i = 0; i < this.prefixList.length; i++) {
      if (!this.prefixList[i].countryCallingCode) {
        this.prefixList.splice(i, 1);
        i--;
      }
    }
  }

  private getCountryName(isoCode: string) {
    return isoCode ? this.countriesList.find((country) => country.countryCode === isoCode).countryNameEn : undefined;
  }
}
