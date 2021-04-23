import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgcCookieConsentService } from 'ngx-cookieconsent';

declare let gtag: Function;
@Component({
  selector: 'sc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public hideHeader: boolean = false;

  constructor(
    public ngccService: NgcCookieConsentService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-V1DH6XT4D8', {
          'page_path': event.urlAfterRedirects
        });
      }

      this.hideHeader = this.router.url === '/' || this.router.url === '/login';
    });
  }

  public ngOnInit() {
    this.hideHeader = this.router.url === '/' || this.router.url === '/login';
  }
}
