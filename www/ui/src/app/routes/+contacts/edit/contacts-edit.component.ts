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
  selector: 'sc-contacts-edit',
  templateUrl: './contacts-edit.component.html',
  styleUrls: ['./contacts-edit.component.scss']
})

export class ContactsEditComponent implements OnInit, OnDestroy {
  // dialogConfig: MatDialogConfig = {
  //   disableClose: false,
  //   autoFocus: true,
  //   minWidth: 480
  // };

  progress = 0;

  contactId: string;
  postSub: Subscription;
  routeParamsSub: Subscription;

  imagePreview: SafeResourceUrl;

  public postFormGroup: FormGroup = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    image: [null]  // Validators.compose([requiredFileType()])]
  });

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
        this.imagePreview = post.data.image;

        this.postFormGroup.setValue({
          title: post.data.title,
          content: post.data.content,
          image: post.data.image ? post.data.image : null
        });
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

    this.postFormGroup.patchValue({image: event}, {onlySelf: true, emitEvent: true});
    // this.postFormGroup.controls['image'].updateValueAndValidity();
    this.postFormGroup.updateValueAndValidity();
  }

  submitPost() {
    console.log('postFormGroup:: ', this.postFormGroup);
    if (this.postFormGroup.valid) {
      try {
        const obj = {
          title: this.postFormGroup.value.title,
          content: this.postFormGroup.value.content,
          image: this.postFormGroup.value.image
        };

        const formData = new FormData();
        formData.append('data[title]', this.postFormGroup.get('title').value);
        formData.append('data[content]', this.postFormGroup.get('content').value);
        formData.append('data[image]', this.postFormGroup.get('image').value);

        let customHeaders: HttpHeaders = new HttpHeaders();
        customHeaders = customHeaders.set('accept', 'application/json');

        if (this.contactId) {
          this.apiService.put('posts/' + this.contactId, formData, null, customHeaders)
          .pipe(first())
          .subscribe((res: ICustomResponse) => {
            console.log('res:: ', res);
            if (!!res) {
              // add confirmation message
              this.showMessage(NOTIFICATIONS_MESSAGES.UPDATED);

              this.router.navigate(['/list']);
            }
          });

        } else {
          this.apiService.post('posts', obj)
          .pipe(first())
          .subscribe((res: ICustomResponse) => {
            console.log('res:: ', res);
            if (!!res) {
              this.postFormGroup.reset();

              // add confirmation message
              this.showMessage(NOTIFICATIONS_MESSAGES.NEW);
              this.snackBar.open('New post created', 'Dismiss', {
                duration: 3000
              });

              // redirect to list
              this.router.navigate(['/list']);
            }
          });
        }

      } catch (err) {
        console.log(err);

        // add error message
        this.showMessage(NOTIFICATIONS_MESSAGES.ERROR);
        this.snackBar.open('Unknown Error, please try again later', 'Dismiss', {
          duration: 3000
        });
      }
    }

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

  hasError( field: string, error: string ) {
    const control = this.postFormGroup.get(field);
    return control.dirty && control.hasError(error);
  }

  onImagePicked(image: Event) {
    console.log(image);

    const reader = new FileReader();
    const file = (image.target as HTMLInputElement).files[0];
    if (file) {
      reader.onload = () => {
        this.postFormGroup.get('image').patchValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result
        });

        console.log('this!!: ', this.postFormGroup.get('image'));
      };

      reader.readAsDataURL(file);
    }

  }

  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
  }
}

export function uploadProgress<T>( cb: ( progress: number ) => void ) {
  return tap(( event: HttpEvent<T> ) => {
    if ( event.type === HttpEventType.UploadProgress ) {
      cb(Math.round((100 * event.loaded) / event.total));
    }
  });
}
