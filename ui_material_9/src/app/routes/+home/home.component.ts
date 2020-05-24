import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ClientStorage } from '@services/client-storage.service';
import { ApiService } from '@services/api.service';
import { first, tap } from 'rxjs/operators';
import { Iitem } from '@interfaces/item.interface';
import { Iitems } from '@interfaces/items.interface';
import { ISorting } from '@interfaces/sorting.interface';
import { Subscription, Observable } from 'rxjs';
import { AppConstants } from '@constants/app-constants.constant';

@Component({
  selector: 'sc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements OnInit, OnDestroy {
  list: any = [];
  savedList: any = [];
  private dataList: any = [];
  private dataSavedList: any = [];
  dataSavedIDs: any = [];
  public subscription: Subscription;

  public sortByItemsDef = [
    {
      title: 'Company',
      type: 'brand',
      order: 'asc',
      isActive: true
    },
    {
      title: 'Kind',
      type: 'kind',
      order: 'asc',
      isActive: false
    },
    {
      title: 'Price',
      type: 'price',
      order: 'asc',
      isActive: false
    }
  ];

  public sortByItemsSaved = [
    {
      title: 'Company',
      type: 'brand',
      order: 'asc',
      isActive: true
    },
    {
      title: 'Kind',
      type: 'kind',
      order: 'asc',
      isActive: false
    }
  ];

  closeResult: string;

  constructor(
    public apiService: ApiService,
    public cs: ClientStorage
  ) { }

  ngOnInit() {
    // this.subscription = this.apiService.get<Iitems>('/InsurProducts.json')
    //   .pipe(
    //     first(),
    //     tap((data) => {
    //       this.dataList = data;
    //       this.list = data;
    //     })
    //   )
    //   .subscribe(() => {
    //     this.loadSavedItems();
    //   },
    //   err => {
    //     console.log(err);
    //   }
    //   );

  }

  searchItems(query: string) {
    if (query.length) {
      this.list = this.dataList.filter((item: Iitem) => {
        return item.name.substring(0, query.length).toLowerCase() === query.toLowerCase();
      });
    } else {
      this.list = [...this.dataList];
    }
  }

  sortingEvent(event: ISorting) {
    if (event.type === 'price') {
      const sortedList = this.list.sort(
        (a: Iitem, b: Iitem) => event.order === 'asc' ? a[event.type] - b[event.type] : b[event.type] - a[event.type]
      );

      this.list = [...sortedList];
    } else {
      const sortedList = this.list.sort((a: Iitem, b: Iitem) => {
        a[event.type] = a[event.type].toLowerCase();
        b[event.type] = b[event.type].toLowerCase();

        if (a[event.type] > b[event.type]) {
          return event.order === 'asc' ? -1 : 1;
        } else if (b[event.type] > a[event.type]) {
          return event.order === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });

      this.list = [...sortedList];
    }
  }

  searchSavedItems(query: string) {
    if (query.length) {
      this.savedList = this.dataSavedList.filter(obj =>
        Object.keys(obj)
          .filter((prop) => prop !== 'price' && prop !== 'id')
          .some(key => obj[key]
            .toLowerCase()
            .includes(query.toLowerCase()
            )
          )
      );
    } else {
      this.savedList = this.dataSavedList;
    }
  }

  loadSavedItems() {
    this.dataSavedIDs = this.cs.getItem(AppConstants.savedItems);

    let items;
    if (this.savedList) {
      items = this.list.filter((item: Iitem) => {
        if (this.dataSavedIDs.indexOf(item.id) !== -1) {
          item.isStarred = true;
          return item;
        }
      });
    }

    if (items) {
      this.savedList = [...items];
      this.dataSavedList = [...items];
    }
  }

  modifyFav(selectedItem: Iitem) {
    const item = this.savedList.findIndex((el: Iitem) => {
      if (el.id === selectedItem.id) {
        return el;
      }
    });

    if (item === -1) {
      this.savedList = [...this.savedList, selectedItem];
    } else {
      this.savedList.splice(item, 1);
      this.savedList = [...this.savedList];
    }

    this.dataSavedList = [...this.savedList];
    this.dataSavedIDs = this.savedList.map((i: Iitem) => i.id);

    for (let i = 0; i < this.list.length; i++) {
      if (this.dataSavedIDs.indexOf(this.list[i].id) !== -1) {
        this.list[i].isStarred = true;
      } else {
        this.list[i].isStarred = false;
      }
    }

    this.cs.setItem(`${AppConstants.savedItems}`, this.dataSavedIDs);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
