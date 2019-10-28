import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sc-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SearchbarComponent implements OnDestroy, OnInit {
  @Input() debounceTime = 500;
  @Output() searchValue: EventEmitter<any> = new EventEmitter<any>();

  public model: any;
  public query = new FormControl();
  private subscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.subscription = this.query.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500)
      )
      .subscribe((query) => {
        this.searchValue.emit(query);
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
