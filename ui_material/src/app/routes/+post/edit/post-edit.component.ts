import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { ClientStorage } from '@services/client-storage.service';
import { ApiService } from '@services/api.service';
import { Ipost } from '@interfaces/post.interface';
import { IpostSingle } from '@interfaces/post-single.interface';
import { ICustomResponse } from '@interfaces/custom-response.interface';
import { first, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NOTIFICATIONS_MESSAGES, MIME_TYPES } from '@constants/app-constants.constant';
import { requiredFileType } from '@shared/validators/file-type.validator';
import { UploadService } from '@services/upload.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';


@Component({
  selector: 'sc-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})

export class PostEditComponent implements OnInit, OnDestroy {
  // dialogConfig: MatDialogConfig = {
  //   disableClose: false,
  //   autoFocus: true,
  //   minWidth: 480
  // };

  progress = 0;

  postId: string;
  postSub: Subscription;
  routeParamsSub: Subscription;

  imagePreview: any;
  breakpoint: number;

  public postFormGroup: FormGroup = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    image: [null, Validators.compose([requiredFileType()])]
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
    this.postId = this.route.snapshot.params.postId;
    this.routeParamsSub = this.route.params.subscribe(params => {
      console.log('subParams', params.postId);
   });

    if (this.postId) {
      console.log(this.postId);
      this.postSub = this.apiService.get<IpostSingle>('posts/' + this.postId)
      .pipe(first())
      .subscribe((post: IpostSingle) => {
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

  submitPost() {
    console.log('postFormGroup:: ', this.postFormGroup);
    if (this.postFormGroup.valid) {
      try {
        const obj = {
          title: this.postFormGroup.value.title,
          content: this.postFormGroup.value.content,
          image: this.postFormGroup.value.image
        };

        if (this.postId) {
          this.apiService.put('posts/' + this.postId, obj)
          .pipe(first())
          .subscribe((res: ICustomResponse) => {
            console.log('res:: ', res);
            if (!!res) {
              // add confirmation message
              this.showMessage(NOTIFICATIONS_MESSAGES.UPDATED);

              // this.router.navigate(['/list']);
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

  onDelete(postId: string) {
    this.apiService.delete(`posts/${postId}`).pipe(first()).subscribe((res) => {
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


    // this.postFormGroup.get('avatar').setValue({
    //   filename: file.name,
    //   filetype: file.type,
    //   value: reader.result.split(',')[1]
    // });
    // value: reader.result.split(',')[1]

    // const file = (image.target as HTMLInputElement).files[0];
    // this.postFormGroup.get('image').patchValue({image: file});
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.imagePreview = reader.result;
    // };

    // reader.readAsDataURL(file);
  }

  // onFileChange(event) {
  //   const reader = new FileReader();
  //   if (event.target.files && event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       this.form.get('avatar').setValue({
  //         filename: file.name,
  //         filetype: file.type,
  //         value: reader.result.split(',')[1]
  //       });
  //     };
  //   }
  // }

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

