import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NOTIFICATIONS_MESSAGES } from '@constants/app-constants.constant';
import { Subscription, of } from 'rxjs';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ContactsService } from '@services/contacts.service';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'sc-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})

export class PublicComponent implements OnInit, OnDestroy {
  contactId: string;
  contact: any;
  isLoading = false;
  imagePreview: SafeResourceUrl;
  routeParamsSub: Subscription;
  userSub: Subscription;
  currentAuthUser: any;

  constructor(
    private authService: AuthService,
    private contactsService: ContactsService,
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.currentAuthUser = this.authService.currentAuthValue;
    console.log( 'currentAuthUser:: ', this.currentAuthUser );

    this.contactId = this.route.snapshot.params.contactId;
    this.routeParamsSub = this.route.params.subscribe(params => {
      console.log('subParams', params.contactId);
    } );

    if (this.contactId) {
      console.log(this.contactId);
      this.userSub = this.contactsService.getContact(this.contactId)
      .pipe(first())
      .subscribe((data: any) => {
        this.contact = data;
      },
      err => {
        console.log(err);
      }
      );
    }

  }

  saveContact() {
    if (!this.currentAuthUser) {
      this.router.navigate(['/login']);
    }

    console.log(this.contactId);
    this.userSub = this.usersService.saveContact(this.currentAuthUser._id, this.contactId)
    .pipe(first())
    .subscribe((data: any) => {
      this.router.navigate([ '/contacts/']);
    },
    err => {
      console.log(err);
    }
    );
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe();
  }
}
