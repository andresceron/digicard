import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  ContentChild,
  TemplateRef,
  Output,
  EventEmitter
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { Subscription } from 'rxjs';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'sc-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TitleComponent implements OnInit {
  @Input() name: string;
  @Input() navBack: boolean;
  @Output() navBackEvent: EventEmitter<any> = new EventEmitter<any>();
  @ContentChild('actions') actions: TemplateRef<NgTemplateOutlet>;

  userSubscription: Subscription;
  currentUser: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.currentUser.subscribe(res => {
      this.currentUser = res;
      this.cdr.markForCheck();
    });

  }

  navBackClicked() {
    this.navBackEvent.emit();
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToList() {
    this.router.navigate(['/list']);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
