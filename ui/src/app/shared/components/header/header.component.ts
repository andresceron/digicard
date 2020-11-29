import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  userSubscription: Subscription;
  currentUser: any;
  activeRoute: string;

  ROUTES = {
    LOGIN: 'login',
    REGISTER: 'register'
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit() {
    this.userSubscription = this.authService.currentAuth.subscribe(res => {
      this.currentUser = res;
      this.cdr.markForCheck();
    });

    this.router.events.subscribe((event: RouterEvent) => {
      if (event.url) {
        this.activeRoute = event.url.replace('/', '');
      }
    });
  }

  public goToPage(path) {
    this.router.navigate([`/${path}`]);
  }

  public onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
