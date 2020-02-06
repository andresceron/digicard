import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, TemplateRef } from '@angular/core';
import { ClientStorage } from '@services/client-storage.service';
import { ApiService } from '@services/api.service';
import { first, map } from 'rxjs/operators';
import { Iposts } from '@interfaces/posts.interface';
import { Ipost } from '@interfaces/post.interface';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '@components/modal/shared/modal.service';
import { ICustomResponse } from '@interfaces/custom-response.interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'sc-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit, OnDestroy {
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
  savedPosts = undefined;

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
    private router: Router
  ) { }

  // @ViewChild('addPostDialog') addPostDialog: TemplateRef<any>;
  // openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
  //   this.dialog.open(templateRef);
  // }

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

  submitPost(editPost) {
    if (this.postFormTitle.valid && this.postFormContent.valid) {
      try {
        const obj = {
          title: this.postFormTitle.value.title,
          content: this.postFormContent.value.content,
        };

        if (editPost) {
          this.apiService.put('posts/' + editPost._id, obj)
          .pipe(first())
          .subscribe((res: ICustomResponse) => {
            console.log('res:: ', res);
            if (!!res) {
              this.postFormTitle.reset();
              this.postFormContent.reset();

              const arrIdx = this.posts.findIndex((post) => post._id === res.data._id);
              this.posts[arrIdx] = {...res.data};
              this.posts = [...this.posts];
            }
          });

        } else {
          this.apiService.post('posts', obj)
          .pipe(first())
          .subscribe((res: ICustomResponse) => {
            console.log('res:: ', res);
            if (!!res) {
              this.postFormTitle.reset();
              this.postFormContent.reset();
              this.posts = [...this.posts, res.data];
            }
          });
        }

      } catch (err) {
        console.log(err);
      }
    }
  }

  onDelete(post: Ipost) {
    this.apiService.delete(`posts/${post._id}`).pipe(first()).subscribe((data) => {
      const updatedPosts = this.posts.filter(postItem => postItem._id !== post._id);
      this.posts = [...updatedPosts];
    });
  }

  onEdit(post: Ipost) {
    console.log(post._id);
    this.router.navigate([ '/post/' + post._id + '/edit']);
  }

  // openAddPostDialog() {
  //   this.editPost = null;
  //   console.log(this.postFormContent);
  //   this.isNewPost = true;
  //   this.dialog.open(this.addPostDialog, this.dialogConfig);
  // }

  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
  }
}
