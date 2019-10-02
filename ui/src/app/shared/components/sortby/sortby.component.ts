import {
  Component,
  Input,
  OnInit,
  ContentChild,
  TemplateRef,
  AfterViewInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'sc-sortby',
  templateUrl: './sortby.component.html',
  styleUrls: ['./sortby.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SortbyComponent implements OnInit, AfterViewInit {
  @ContentChild('titleRef') titleRef: TemplateRef<any>;
  @ContentChild('tagRef') tagRef: TemplateRef<any>;
  @Input() items = [];
  @Output() tabEvent = new EventEmitter();


  constructor() {
  }

  ngOnInit() {
  }

  tabClicked(clickedTab: any) {
    this.items.forEach((item) => item.isActive = false);

    if (clickedTab.order === 'asc') {
      clickedTab.order = 'desc';
    } else {
      clickedTab.order = 'asc';
    }

    clickedTab.isActive = true;
    this.tabEvent.emit(clickedTab);
  }

  ngAfterViewInit() {
  }

}
