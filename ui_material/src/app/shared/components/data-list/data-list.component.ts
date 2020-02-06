import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ContentChild,
  TemplateRef,
  Output,
  EventEmitter
   } from '@angular/core';

import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'sc-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DataListComponent {
  _items: any[] = [];

  @Input() noResultsText = 'No results found';
  @Input() virtualScrollHeight = 560;
  @Input() hasPrice = true;
  @Input() listToModify: any[];
  @Output() itemEvent = new EventEmitter();
  @Input() selectedItems = [];

  @Input() set items(items) {
    console.log('items', items);
    this._items = items;
  }

  // get items() {
  //   console.log('inside items', this._items);
  //   return this._items;
  // }

  @ContentChild('row') rowTemplate: TemplateRef<NgTemplateOutlet>;
  @ContentChild('footer') footerTemplate: TemplateRef<NgTemplateOutlet>;

  constructor() {
  }

  clickedFavItem(listToModify, item, idx) {
    this.itemEvent.emit({listToModify, item, idx});
  }

}
