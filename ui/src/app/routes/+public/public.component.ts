import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '@services/auth.service';
import { ContactsService } from '@services/contacts.service';
import { REG_EXP_PATTERNS } from '@constants/app-constants.constant';
import { IUser } from '@interfaces/user.interface';
import { first } from 'rxjs/operators';

@Component({
  selector: 'sc-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {
  contactId: string;
  contact: any;
  isLoading = false;
  imagePreview: SafeResourceUrl;
  currentAuthUser: any;

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

  public saveContact() {
    if (!this.currentAuthUser) {
      this.router.navigate(['/login']);
    }

    this.contactsService
      .saveContact(this.contactId)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.router.navigate(['/contacts/']);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  private initSubscriptions() {
    this.contactsService
      .getContact(this.contactId)
      .pipe(first())
      .subscribe(
        (data: IUser) => {
          this.contact = data;
          this.configSocialUrls(this.contact.socials);
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  private configSocialUrls(socials) {
    const socialReplacePattern = new RegExp(REG_EXP_PATTERNS.SOCIAL_REPLACE);

    socials.forEach((social) => {
      if (!social.value) {
        return;
      }

      social.fullUrl = social.baseUrl.replace(socialReplacePattern, social.value);
    });
  }
}
