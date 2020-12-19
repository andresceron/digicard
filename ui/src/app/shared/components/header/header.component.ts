import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { ROUTES } from '@constants/app-constants.constant';
import { IAuthResponse } from '@interfaces/auth-response.interface';
import { AuthService } from '@services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnInit, OnDestroy {
  public readonly ROUTES = ROUTES;
  public currentUser: IAuthResponse;
  public activeRoute: string;

  private userSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.userSubscription = this.authService.currentAuth().subscribe(res => {
      this.currentUser = res;
      this.cdr.markForCheck();
    });

    this.configSubscriptions();
  }

  public goToPage(path): void {
    this.router.navigate([`/${path}`]);
  }

  public onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private configSubscriptions() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event.url) {
        this.activeRoute = event.url.replace('/', '');
        console.log(this.activeRoute);
        this.cdr.markForCheck();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
