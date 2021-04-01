import { Component, OnInit } from '@angular/core';
import { UsersService } from '@services/users.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { IUser } from '@interfaces/user.interface';

@Component({
  selector: 'sc-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {
  public user: IUser;
  public userSub: Subscription;
  public isQRVisible = false;
  public linkEmail: SafeResourceUrl;
  public linkSMS: SafeResourceUrl;
  public linkCopy: string;

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {
  }

  ngOnInit(): void {
    this.usersService.getUser(this.authService.currentAuthValue?._id)
      .pipe(first())
      .subscribe( data => {
        this.user = data;
    });
  }
}
