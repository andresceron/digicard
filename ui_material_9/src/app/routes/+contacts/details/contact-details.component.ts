import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ClientStorage } from '@services/client-storage.service';
import { ApiService } from '@services/api.service';
import { IpostSingle } from '@interfaces/post-single.interface';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NOTIFICATIONS_MESSAGES } from '@constants/app-constants.constant';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ContactsService } from '@services/contacts.service';
import { IUserResponse } from '@interfaces/user-response.interface';
import { IUser } from '@interfaces/user.interface';
import { UsersService } from '@services/users.service';
import { AuthService } from '@services/auth.service';

@Component({
    selector: 'sc-contact-details',
    templateUrl: './contact-details.component.html',
    styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  progress = 0;
  isLoading = false;

  contactId: string;
  postSub: Subscription;
  routeParamsSub: Subscription;
  contactSubscription: Subscription;

  imagePreview: SafeResourceUrl;
  contactData: any;

  constructor(
    public cs: ClientStorage,
    public cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.contactId = this.route.snapshot.params.contactId;
    if (this.contactId) {
      this.contactsService.getContact(this.contactId)
          .pipe(first())
          .subscribe(
            (contact: IUser) => {
              this.isLoading = false;

              this.contactData = contact;
              this.configSocialUrls(contact.socials);
            },
            (err: Error) => {
                this.isLoading = false;
                console.log(err);
              }
          );
    }
  }

  configSocialUrls(socials) {
    const socialReplacePattern = new RegExp(/(?:^|\W)\$socialid\$(?:$|\W)/);

    socials.forEach(social => {
      if (!social.value) {
        return;
      }

      social.fullUrl = social.baseUrl.replace(socialReplacePattern, social.value);
    });
  }

  imageFileEvent(event) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result;
    };

    reader.readAsDataURL(event);
  }

  showMessage(value) {
    this.snackBar.open(value, 'Dismiss', {
      duration: 3000,
    });
  }

  deleteContact() {
    console.log('DELETE ?? ', this.authService.currentAuthValue);
    this.contactSubscription =
      this.contactsService
        .removeContact(this.authService.currentAuthValue._id, this.contactId)
        .pipe(first())
        .subscribe((data: any) => {
          console.log(data);

          this.showMessage(NOTIFICATIONS_MESSAGES.DELETED);
          this.router.navigate(['/list']);

        },
        err => {
          console.log(err);
        }
      );
  }

  onNavBack() {
    this.router.navigate(['/contacts/']);
  }

  ngOnDestroy() {
  }
}
