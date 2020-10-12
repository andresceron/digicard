import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ClientStorage } from '@services/client-storage.service';
import { ApiService } from '@services/api.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { Ipost } from '@interfaces/post.interface';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '@components/modal/shared/modal.service';
import { ICustomResponse } from '@interfaces/custom-response.interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSelectionList } from '@angular/material/list';
import { ContactsService } from '@services/contacts.service';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'sc-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})

export class ContactsComponent implements OnInit, OnDestroy {
  contacts: any;
  contactsSub: Subscription;
  isPostSubmitted = false;
  isNewPost = false;
  editPost: Ipost;
  oldSearchQuery: string | undefined = undefined;
  currentAuthUser: any;
  dialogConfig: MatDialogConfig = {
    disableClose: false,
    autoFocus: true,
    minWidth: 480
  };
  savedPosts = undefined;
  isLoading = false;
  isSearchbarVisible = false;

  @ViewChild(MatSelectionList, { static: true }) selectionList: MatSelectionList;

  public postFormTitle: FormGroup = this.fb.group({
    title: ['', Validators.required],
  });
  public postFormContent: FormGroup = this.fb.group({
    content: ['', Validators.required]
  });

  constructor(
    public apiService: ApiService,
    public cs: ClientStorage,
    public cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private modalService: ModalService,
    private dialog: MatDialog,
    private contactsService: ContactsService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.currentAuthUser = this.authService.currentAuthValue;
    this.loadContacts();
  }

  loadContacts() {
    this.isLoading = true;
    this.searchContacts('');
  }

  searchContacts(query?: string) {
    if (query === this.oldSearchQuery) {
      return;
    }

    this.oldSearchQuery = query;

    this.isLoading = true;
    this.contactsService.getContacts(this.currentAuthUser._id, query)
      .pipe(
        distinctUntilChanged(),
      )
      .subscribe(res => {
        this.isLoading = false;
        this.contacts = res;
    });
  }

  onEdit(post: Ipost) {
    console.log(post._id);
    this.router.navigate([ '/post/' + post._id + '/edit']);
  }

  goToDetail(contact: Ipost) {
    console.log(contact);
    this.router.navigate([ '/contacts/' + contact._id + '/detail']);
  }

  onNavBack() {
    console.log('back!!');
  }

  toggleSearchbar() {
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
