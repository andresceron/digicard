import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { ClientStorage } from '@services/client-storage.service';
import { ApiService } from '@services/api.service';
import { IpostSingle } from '@interfaces/post-single.interface';
import { ICustomResponse } from '@interfaces/custom-response.interface';
import { first, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NOTIFICATIONS_MESSAGES } from '@constants/app-constants.constant';
import { requiredFileType } from '@shared/validators/file-type.validator';
import { HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'sc-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})

export class ContactDetailsComponent implements OnInit, OnDestroy {
  progress = 0;

  contactId: string;
  postSub: Subscription;
  routeParamsSub: Subscription;

  imagePreview: SafeResourceUrl;
  contactData: any;

  constructor(
    public apiService: ApiService,
    public cs: ClientStorage,
    public cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.contactId = this.route.snapshot.params.contactId;
    this.routeParamsSub = this.route.params.subscribe(params => {
      console.log('subParams', params.contactId);
    });

    if (this.contactId) {
      console.log(this.contactId);
      this.postSub = this.apiService.get<IpostSingle>('posts/' + this.contactId)
      .pipe(first())
      .subscribe((post: IpostSingle) => {
        this.contactData = post.data;
      },
      err => {
        console.log(err);
      }
      );
    }

  }

  imageFileEvent(event) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result;
    };

    reader.readAsDataURL(event);

    // this.postFormGroup.patchValue({image: event}, {onlySelf: true, emitEvent: true});
    // this.postFormGroup.controls['image'].updateValueAndValidity();
    // this.postFormGroup.updateValueAndValidity();
  }

  showMessage(value) {
    this.snackBar.open(value, 'Dismiss', {
      duration: 3000
    });
  }

  onDelete(contactId: string) {
    this.apiService.delete(`posts/${contactId}`).pipe(first()).subscribe((res) => {
      if (!!res) {
        this.showMessage(NOTIFICATIONS_MESSAGES.DELETED);
        this.router.navigate(['/list']);
      }
    });
  }

  onNavBack() {
    this.router.navigate([ '/contacts/']);
  }

  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
  }
}
