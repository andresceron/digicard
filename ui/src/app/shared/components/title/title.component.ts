import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  ContentChild,
  TemplateRef,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { AuthService } from '@services/auth.service';
import { Subscription } from 'rxjs';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'sc-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TitleComponent implements OnInit, OnDestroy {
  @Input() name: string;
  @Input() navBack: boolean;
  @Output() navBackEvent: EventEmitter<any> = new EventEmitter<any>();
  @ContentChild('actions') actions: TemplateRef<NgTemplateOutlet>;

  userSubscription: Subscription;
  currentUser: any;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.currentAuth().subscribe(res => {
      this.currentUser = res;
      this.cdr.markForCheck();
    });
  }

  public navBackClicked(): void {
    this.navBackEvent.emit();
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
