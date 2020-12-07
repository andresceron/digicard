import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { UsersService } from '@services/users.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'environments/environment';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'sc-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})

export class ShareComponent implements OnInit, OnDestroy {
  public user;
  public userSub: Subscription;
  public isQRVisible = false;
  public linkEmail: SafeResourceUrl;
  public linkSMS: SafeResourceUrl;
  public linkCopy: string;

  private config = {
    baseUrl: environment.baseUrl
  };

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.userSub = this.usersService.getUser(this.authService.currentAuthValue._id)
      .pipe(first())
      .subscribe( data => {
        console.log('DATA', data );
        this.user = data;
        this.configData();
    });
  }

  configData() {
    this.configQR();
    this.configEmail();
    this.configSMS();
    this.configLink();
  }

  configQR() {
    this.user.qr = this.user.qr ? this.sanitizeUrl(this.user.qr) : false;
  }

  configEmail() {
    this.linkEmail =
      `mailto:?Subject=SocialCard - ${ this.user.firstName + ' ' + this.user.lastName }` +
      `&body=Check out my social card here:%20` +
      `${this.config.baseUrl}contacts/${this.user._id }%0A%0A` +
      `Want to get your own social card? Register here: ${this.config.baseUrl}register`;
  }

  configSMS() {
    const link = `sms:%20&body=Check out my social card here: ${this.config.baseUrl}contacts/${this.user._id}`;
    this.linkSMS = this.sanitizeUrl(link);
  }

  configLink() {
    this.linkCopy = `${this.config.baseUrl}public/${this.user._id}`;
  }

  shareQR(): void {
    if ( this.isQRVisible ) {
      this.isQRVisible = false;
    }
    this.isQRVisible = true;
  }

  shareLink() {
    const selBox = document.createElement('textarea');
    selBox.value = this.linkCopy;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild( selBox );

    // add confirmation message
    this.snackBar.open('Link Copied Successfully', 'Dismiss', {
      duration: 3000
    });

  }

  backToList() {
    this.isQRVisible = false;
  }

  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  ngOnDestroy() {
  }
}
