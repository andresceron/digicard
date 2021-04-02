import { Component, OnInit } from '@angular/core';
import { UsersService } from '@services/users.service';
import { first } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { IUser } from '@interfaces/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'sc-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {
  public user: IUser;
  public confirmDelete: boolean = false;
  public preDeleteMessage: string;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.usersService.getUserData()
      .pipe(first())
      .subscribe( data => {
        this.user = data;
      });

    this.setPreDeleteMessage();
  }

  public confirmDeleteAction() {
    this.confirmDelete = !this.confirmDelete;
    this.setPreDeleteMessage();
  }

  public deleteUser() {
    console.log('deteUser ', this.user);
    this.usersService.deleteUser(this.user._id)
      .pipe(
        first()
      )
      .subscribe((user: IUser) => {
        if (!!user) {
          this.showMessage(`Your account has been deleted. We will miss you ${user.firstName || user.email}`);
          this.authService.logout();
        }
      });
  }

  private showMessage(value: string): void {
    this.snackBar.open(value, 'Dismiss', {
      duration: 3000
    });
  }

  private setPreDeleteMessage() {
    this.preDeleteMessage = this.confirmDelete ? 'Are you sure you want to delete your account?' : 'Do you want to delete your account';
  }
}
