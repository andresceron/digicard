import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { ContactsService } from '@services/contacts.service';
import { REG_EXP_PATTERNS } from '@constants/app-constants.constant';
import { IUser } from '@interfaces/user.interface';
import { first } from 'rxjs/operators';
import { IAuthResponse } from '@interfaces/auth-response.interface';

@Component({
  selector: 'sc-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {
  public contact: IUser;
  private currentAuthUser: IAuthResponse;
  private contactId: string;

  constructor(
    private authService: AuthService,
    private contactsService: ContactsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.currentAuthUser = this.authService.currentAuthValue;
    this.contactId = this.route.snapshot.params.contactId;
    if (this.contactId) {
      this.initSubscriptions();
    }
  }

  public saveContact(): void {
    if (!this.currentAuthUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.contactsService
    .saveContact(this.contactId)
    .pipe(first())
    .subscribe(
      (data: any) => {
          this.router.navigate(['/contacts']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  private initSubscriptions(): void {
    this.contactsService
      .getContact(this.contactId)
      .pipe(first())
      .subscribe(
        (data: IUser) => {
          this.contact = data;
          this.configSocialUrls(this.contact.socials);
        },
        (err: any) => {
          // TODO: Handle error better
          console.log(err);
        }
      );
  }

  private configSocialUrls(socials): void {
    const socialReplacePattern = new RegExp(REG_EXP_PATTERNS.SOCIAL_REPLACE);

    socials.forEach((social) => {
      if (!social.value) {
        return;
      }

      social.fullUrl = social.baseUrl.replace(socialReplacePattern, social.value);
    });
  }
}
