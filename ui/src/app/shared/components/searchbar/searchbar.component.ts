import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
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

  public query = new FormControl();
  private querySub: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.querySub = this.query.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(500)
      )
      .subscribe((query) => {
        this.searchValue.emit(query);
      });
  }

  resetValue(): void {
    this.query.reset();
  }

  ngOnDestroy(): void {
    if (this.querySub) {
      this.querySub.unsubscribe();
    }
  }

}
