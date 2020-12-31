import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgcCookieConsentService } from 'ngx-cookieconsent';

declare let gtag: Function;
@Component({
  selector: 'sc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public router: Router,
    public ngccService: NgcCookieConsentService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-V1DH6XT4D8', {
          'page_path': event.urlAfterRedirects
        });
      }
    });
  }
}
