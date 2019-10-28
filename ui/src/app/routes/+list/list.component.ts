import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
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
@Component({
  selector: 'sc-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit, OnDestroy {
  posts: Ipost[];
  postSub: Subscription;
  isPostSubmitted = false;

  public postForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required]
  });

  constructor(
    public apiService: ApiService,
    public cs: ClientStorage,
    public cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private modalService: ModalService
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

  addPost() {
    if (this.postForm.valid) {

      try {
        const obj = {
          title: this.postForm.value.title,
          content: this.postForm.value.content
        };

        this.apiService.post('posts', obj)
          .pipe(first())
          .subscribe((res: ICustomResponse) => {
            if (!!res) {
            this.modalService.close('addPostModal');
            this.postForm.reset();

            console.log(res.data);
            console.log(this.posts);
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

  // searchItems(query: string) {
  //   if (query.length) {
  //     this.list = this.dataList.filter((item: Iitem) => {
  //       return item.name.substring(0, query.length).toLowerCase() === query.toLowerCase();
  //     });
  //   } else {
  //     this.list = [...this.dataList];
  //   }
  // }

  // sortingEvent(event: ISorting) {
  //   if (event.type === 'price') {
  //     const sortedList = this.list.sort(
  //       (a: Iitem, b: Iitem) => event.order === 'asc' ? a[event.type] - b[event.type] : b[event.type] - a[event.type]
  //     );

  //     this.list = [...sortedList];
  //   } else {
  //     const sortedList = this.list.sort((a: Iitem, b: Iitem) => {
  //       a[event.type] = a[event.type].toLowerCase();
  //       b[event.type] = b[event.type].toLowerCase();

  //       if (a[event.type] > b[event.type]) {
  //         return event.order === 'asc' ? -1 : 1;
  //       } else if (b[event.type] > a[event.type]) {
  //         return event.order === 'asc' ? 1 : -1;
  //       } else {
  //         return 0;
  //       }
  //     });

  //     this.list = [...sortedList];
  //   }
  // }

  // searchSavedItems(query: string) {
  //   if (query.length) {
  //     this.savedList = this.dataSavedList.filter(obj =>
  //       Object.keys(obj)
  //         .filter((prop) => prop !== 'price' && prop !== 'id')
  //         .some(key => obj[key]
  //           .toLowerCase()
  //           .includes(query.toLowerCase()
  //           )
  //         )
  //     );
  //   } else {
  //     this.savedList = this.dataSavedList;
  //   }
  // }

  // loadSavedItems() {
  //   this.dataSavedIDs = this.cs.getItem(AppConstants.savedItems);

  //   let items;
  //   if (this.savedList) {
  //     items = this.list.filter((item: Iitem) => {
  //       if (this.dataSavedIDs.indexOf(item.id) !== -1) {
  //         item.isStarred = true;
  //         return item;
  //       }
  //     });
  //   }

  //   if (items) {
  //     this.savedList = [...items];
  //     this.dataSavedList = [...items];
  //   }
  // }

  // modifyFav(selectedItem: Iitem) {
  //   const item = this.savedList.findIndex((el: Iitem) => {
  //     if (el.id === selectedItem.id) {
  //       return el;
  //     }
  //   });

  //   if (item === -1) {
  //     this.savedList = [...this.savedList, selectedItem];
  //   } else {
  //     this.savedList.splice(item, 1);
  //     this.savedList = [...this.savedList];
  //   }

  //   this.dataSavedList = [...this.savedList];
  //   this.dataSavedIDs = this.savedList.map((i: Iitem) => i.id);

  //   for (let i = 0; i < this.list.length; i++) {
  //     if (this.dataSavedIDs.indexOf(this.list[i].id) !== -1) {
  //       this.list[i].isStarred = true;
  //     } else {
  //       this.list[i].isStarred = false;
  //     }
  //   }

  //   this.cs.setItem(`${AppConstants.savedItems}`, this.dataSavedIDs);
  // }

  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
  }
}
