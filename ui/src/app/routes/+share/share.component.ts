import { Component, OnInit } from '@angular/core';
import { UsersService } from '@services/users.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'environments/environment';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { IUser } from '@interfaces/user.interface';
import { NOTIFICATIONS_MESSAGES } from '@constants/app-constants.constant';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'sc-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})

export class ShareComponent implements OnInit {
  public user: IUser;
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
    private snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.usersService.getUserData()
      .pipe(
        first()
      )
      .subscribe(user => {
        this.user = user;
        this.configData();
    });
  }

  public shareQR(): void {
    this.router.navigate([`/share/qr`]);
  }

  public shareLink(): void {
    const selBox = document.createElement('textarea');
    selBox.value = this.linkCopy;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.showMessage(NOTIFICATIONS_MESSAGES.LINK_COPIED_SUCCESS);
  }

  private configData(): void {
    this.configCopyLink();
    this.configEmail();
    this.configSMS();
  }

  private configEmail(): void {
    this.linkEmail =
      `mailto:?Subject=Socialar - ${ this.user?.firstName + ' ' + this.user?.lastName }` +
      `&body=Check out my social card here:%20` +
      `${this.linkCopy}%0A%0A` +
      `Want to get your own social card? Register here: ${this.config.baseUrl}register`;
  }

  private configSMS(): void {
    const link = `sms:%20&body=Check out my social card here: ${this.publicLink}`;
    this.linkSMS = this.sanitizeUrl(link);
  }

  private configCopyLink(): void {
    this.linkCopy = this.publicLink;
  }

  private showMessage(value: string): void {
    this.snackBar.open(value, 'Dismiss', {
      duration: 3000
    });
  }

  private get publicLink(): string {
    return `${this.config.baseUrl}public/${this.user?._id}`;
  }

  private sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
