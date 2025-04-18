import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, first } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NOTIFICATIONS_MESSAGES, REG_EXP_PATTERNS } from '@constants/app-constants.constant';
import { UsersService } from '@services/users.service';
import { IUser } from '@interfaces/user.interface';
import * as countryCodes from 'country-codes-list';
import { UploadService } from '@services/upload.service';

@Component({
  selector: 'sc-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public TITLE = 'Profile';
  public isPreview = false;
  public countriesList = countryCodes.all();
  public prefixList = [];
  public user: IUser;
  public isUploadingImage = false;

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

  private currentAuthUser: any;
  private socialReplacePattern = new RegExp(REG_EXP_PATTERNS.SOCIAL_REPLACE);

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private uploadService: UploadService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.currentAuthUser = this.authService.currentAuthValue;

    this.configPrefixList();
    this.initSubscriptions();
  }

  public imageFileEvent(event) {
    this.isUploadingImage = true;

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
            this.isUploadingImage = false;
          }
        );
    } catch (err) {
      this.isUploadingImage = false;
    }
  }

  public onSubmit(): void {
    if (!this.profileForm.valid) {
      return;
    }

    try {
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
              this.user = res;
              this.user.countryName = this.getCountryName(this.user.country);
              this.snackBar.open(NOTIFICATIONS_MESSAGES.PROFILE_UPDATE_SUCCESS, 'Dismiss', { duration: 5000 });
            }
          },
          (err) => {
            this.snackBar.open(NOTIFICATIONS_MESSAGES.PROFILE_UPDATE_ERROR, 'Dismiss', {
              duration: 5000
            });
          }
        );
    } catch (err) {
      this.snackBar.open(NOTIFICATIONS_MESSAGES.PROFILE_UPDATE_ERROR, 'Dismiss', {
        duration: 5000
      });
    }
  }

  public showPreview(value) {
    this.TITLE = value ? 'Preview' : 'Profile';
    this.isPreview = value;
  }

  public removeAvatar() {
    this.profileForm.get('socials').patchValue({ image: null });
    this.profileForm.get('socials').updateValueAndValidity();
    this.user.image = null;
  }

  private initSubscriptions(): void {
    this.usersService
      .getUserData()
      .pipe(first())
      .subscribe(
        (res: IUser) => {
          if (!!res) {
            this.user = res;
            this.user.countryName = this.user.country ? this.getCountryName(this.user.country) : undefined;

            this.configForm();
            this.configSocialUrls(this.user.socials);
          }
        },
        (err: any) => {
          console.log('err!', err);
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

  private configSocialUrls(socials): void {
    socials.forEach((social) => {
      if (!social.value) {
        return;
      }

      social.fullUrl = social.baseUrl?.replace(this.socialReplacePattern, social?.value);
    });
  }

  private updateSocialUrls(socials): void {
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

  private configForm(): void {
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

  private configPrefixList(): void {
    this.prefixList = countryCodes.all();
    for (let i = 0; i < this.prefixList.length; i++) {
      if (!this.prefixList[i].countryCallingCode) {
        this.prefixList.splice(i, 1);
        i--;
      }
    }
  }

  private getCountryName(isoCode: string): string {
    return isoCode ? this.countriesList.find((country) => country.countryCode === isoCode).countryNameEn : undefined;
  }
}
