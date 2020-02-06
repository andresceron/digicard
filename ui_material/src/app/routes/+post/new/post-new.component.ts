import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, TemplateRef } from '@angular/core';
import { ClientStorage } from '@services/client-storage.service';
import { ApiService } from '@services/api.service';
import { first } from 'rxjs/operators';
import { Iposts } from '@interfaces/posts.interface';
import { Ipost } from '@interfaces/post.interface';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ICustomResponse } from '@interfaces/custom-response.interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'sc-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.scss']
})

export class PostNewComponent implements OnInit, OnDestroy {
  posts: Ipost[];
  postSub: Subscription;
  isPostSubmitted = false;
  isNewPost = false;
  editPost: Ipost;
  dialogConfig: MatDialogConfig = {
    disableClose: false,
    autoFocus: true,
    minWidth: 480
  };

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
    private router: Router
  ) { }

  ngOnInit() {
    this.postSub = this.apiService.get<Iposts>('posts')
    .pipe(
      first()
    )
    .subscribe((res: Iposts) => {
      console.log(res);
      this.posts = res.data;
    },
    err => {
      console.log(err);
    }
    );

  }

  submitPost() {
    if (this.postFormGroup.valid && this.postFormGroup.valid) {
      try {
        const obj = {
          title: this.postFormGroup.value.title,
          content: this.postFormGroup.value.content,
        };

        this.apiService.post('posts', obj)
        .pipe(first())
        .subscribe((res: ICustomResponse) => {
          console.log('res:: ', res);
          if (!!res) {
            this.postFormGroup.reset();
            this.postFormGroup.reset();

            this.router.navigate(['/list']);
          }
        });

      } catch (err) {
        console.log(err);
      }
    }
  }

  onDelete(post: Ipost) {
    this.apiService.delete(`post/${post._id}`).pipe(first()).subscribe((data) => {
      const updatedPosts = this.posts.filter(postItem => postItem._id !== post._id);
      this.posts = [...updatedPosts];
    });
  }

  onEdit(post: Ipost) {
    this.postFormGroup.setValue({title: post.title});
    this.postFormGroup.setValue({content: post.content});

    this.editPost = post;

  }

  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
  }
}
