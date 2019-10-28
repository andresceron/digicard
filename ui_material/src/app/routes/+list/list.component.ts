import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, TemplateRef } from '@angular/core';
import { ClientStorage } from '@services/client-storage.service';
import { ApiService } from '@services/api.service';
import { first, map } from 'rxjs/operators';
import { Iposts } from '@interfaces/posts.interface';
import { Ipost } from '@interfaces/post.interface';
import { Subscription } from 'rxjs';
import { AppConstants } from '@constants/app-constants.constant';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalService } from '@components/modal/shared/modal.service';
import { ICustomResponse } from '@interfaces/custom-response.interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'sc-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit, OnDestroy {
  posts: Ipost[];
  postSub: Subscription;
  isPostSubmitted = false;

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
    private dialog: MatDialog
  ) { }

  @ViewChild('addPostDialog') addPostDialog: TemplateRef<any>;
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

  addPost() {
    if (this.postFormTitle.valid && this.postFormContent.valid) {
      try {
        const obj = {
          title: this.postFormTitle.value.title,
          content: this.postFormContent.value.content
        };

        this.apiService.post('posts', obj)
          .pipe(first())
          .subscribe((res: ICustomResponse) => {
            if (!!res) {
            this.modalService.close('addPostModal');
            this.postFormTitle.reset();
            this.postFormContent.reset();

            this.posts = [...this.posts, res.data];
          }
        });
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

  openAddPostDialog() {

    let dialogConfig = new MatDialogConfig();
    dialogConfig = {
      disableClose: false,
      autoFocus: true,
      minWidth: 480
    };

    this.dialog.open(this.addPostDialog, dialogConfig);
}

  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
  }
}
