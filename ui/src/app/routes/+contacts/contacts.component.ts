import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ApiService } from '@services/api.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { Ipost } from '@interfaces/post.interface';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSelectionList } from '@angular/material/list';
import { ContactsService } from '@services/contacts.service';
import { AuthService } from '@services/auth.service';
import { IContact } from '@interfaces/contact.interface';

@Component({
  selector: 'sc-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})

export class ContactsComponent implements OnInit, OnDestroy {
  @ViewChild(MatSelectionList, { static: true }) selectionList: MatSelectionList;

  public contacts: IContact[];
  public isSearchbarVisible = false;

  private contactsSub: Subscription;
  private oldSearchQuery: string | undefined = undefined;
  private currentAuthUser: any;

  constructor(
    public apiService: ApiService,
    private contactsService: ContactsService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentAuthUser = this.authService.currentAuthValue;
    this.loadContacts();
  }

  private loadContacts(): void {
    this.searchContacts('');
  }

  public searchContacts(query?: string): void {
    if (query === this.oldSearchQuery) {
      return;
    }

    this.oldSearchQuery = query;

    this.contactsSub =
      this.contactsService.getContacts(this.currentAuthUser._id, query)
        .pipe(
          distinctUntilChanged()
        )
        .subscribe(res => {
          this.contacts = res;
        });
  }

  public goToDetail(contact: Ipost): void {
    this.router.navigate([ `/contacts/${contact._id}/detail`]);
  }

  public toggleSearchbar(): void {
    if (!this.isSearchbarVisible) {
      this.isSearchbarVisible = true;
    } else {
      this.isSearchbarVisible = false;
      this.searchContacts('');
    }
  }

  ngOnDestroy() {
    if (this.contactsSub) {
      this.contactsSub.unsubscribe();
    }
  }

}
