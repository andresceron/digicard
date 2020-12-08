import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ClientStorage } from '@services/client-storage.service';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NOTIFICATIONS_MESSAGES, REG_EXP_PATTERNS } from '@constants/app-constants.constant';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ContactsService } from '@services/contacts.service';
import { IUser } from '@interfaces/user.interface';
import { AuthService } from '@services/auth.service';
import { ISocials } from '@interfaces/socials.interface';

@Component({
  selector: 'sc-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  public contactData: IUser;
  private contactId: string;
  private contactSubscription: Subscription;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private contactsService: ContactsService
  ) {}

  ngOnInit(): void {
    this.contactId = this.route.snapshot.params.contactId;
    if (this.contactId) {
      this.contactsService
        .getContact(this.contactId)
        .pipe(first())
        .subscribe(
          (contact: IUser) => {
            this.contactData = contact;
            this.configSocialUrls(contact.socials);
          }
        );
    }
  }

  public deleteContact(): void {
    this.contactSubscription = this.contactsService
      .removeContact(this.contactId)
      .pipe(first())
      .subscribe(() => {
          this.showMessage(NOTIFICATIONS_MESSAGES.DELETED);
          this.router.navigate(['/list']);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  private configSocialUrls(socials: ISocials[]): void {
    const socialReplacePattern = new RegExp(REG_EXP_PATTERNS.SOCIAL_REPLACE);

    socials.forEach((social) => {
      if (!social.value) {
        return;
      }

      social.fullUrl = social.baseUrl.replace(socialReplacePattern, social.value);
    });
  }

  private showMessage(value: string): void {
    this.snackBar.open(value, 'Dismiss', {
      duration: 3000
    });
  }

  public onNavBack(): void {
    this.router.navigate(['/contacts/']);
  }

  public ngOnDestroy() {
    if (this.contactSubscription) {
      this.contactSubscription.unsubscribe();
    }
  }
}
