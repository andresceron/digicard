import { Component, OnInit } from '@angular/core';
import { first, takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NOTIFICATIONS_MESSAGES, REG_EXP_PATTERNS } from '@constants/app-constants.constant';
import { ContactsService } from '@services/contacts.service';
import { IUser } from '@interfaces/user.interface';
import { ISocials } from '@interfaces/socials.interface';
import { IContact } from '@interfaces/contact.interface';
import { Subject, timer } from 'rxjs';

@Component({
  selector: 'sc-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  public contactData: IUser;
  public hasDeleteContactError: boolean;
  private contactId: string;
  private timerSubject = new Subject<void>();

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private contactsService: ContactsService
  ) {}

  ngOnInit(): void {
    this.contactId = this.route.snapshot.params.contactId;
    if (this.contactId) {
      this.setContactSubscription();
    }
  }

  public deleteContact(): void {
    try {
      this.contactsService
        .removeContact(this.contactId)
        .pipe(first())
        .subscribe(() => {
            this.showMessage(NOTIFICATIONS_MESSAGES.DELETED);
            this.goToContacts();
          },
          (err) => {
            // TODO: Add unit test for this and proper error handling?
            console.log(err);
            this.showDeleteContactError();
          }
        );
    } catch (err) {
      // TODO: Add unit test for this and proper error handling?
      this.showDeleteContactError();
    }
  }

  public goToContacts(): void {
    this.router.navigate(['/contacts']);
  }

  private setContactSubscription() {
    this.contactsService
    .getContact(this.contactId)
    .pipe(first())
    .subscribe(
      (contact: IContact) => {
        this.contactData = contact;
        this.configSocialUrls(contact.socials);
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

  private showDeleteContactError(): void {
    // set it on the UI
    this.hasDeleteContactError = true;
    timer(0, 3000).pipe(
      takeUntil(this.timerSubject)
    ).subscribe(() => {
      this.hasDeleteContactError = false;

      this.timerSubject.next();
      this.timerSubject.complete();
    });
  }

  private showMessage(value: string): void {
    this.snackBar.open(value, 'Dismiss', {
      duration: 3000
    });
  }

}
