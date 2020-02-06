import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, TemplateRef } from '@angular/core';
import { ClientStorage } from '@services/client-storage.service';
import { ApiService } from '@services/api.service';
import { Ipost } from '@interfaces/post.interface';
import { IpostSingle } from '@interfaces/post-single.interface';
import { ICustomResponse } from '@interfaces/custom-response.interface';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NOTIFICATIONS_MESSAGES } from '@constants/app-constants.constant';


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

  postId: string;
  postSub: Subscription;
  routeParamsSub: Subscription;

  public postFormGroup: FormGroup = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required]
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
          content: post.data.content
        });
      },
      err => {
        console.log(err);
      }
      );
    }

  }

  submitPost() {
    if (this.postFormGroup.valid) {
      try {
        const obj = {
          title: this.postFormGroup.value.title,
          content: this.postFormGroup.value.content,
        };

        if (this.postId) {
          this.apiService.put('posts/' + this.postId, obj)
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

  onDelete(post: Ipost) {
    this.apiService.delete(`post/${post._id}`).pipe(first()).subscribe((data) => {
      // show deleted message
      // redirect to list
    });
  }

  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
  }
}
