import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnInit {

  userSubscription: Subscription;
  currentUser: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.currentAuth.subscribe(res => {
      this.currentUser = res;
      this.cdr.markForCheck();
    });

  }

  goToPage(path) {
    this.router.navigate([`/${path}`]);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
