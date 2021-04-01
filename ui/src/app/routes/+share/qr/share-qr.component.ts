import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '@services/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'sc-share-qr',
  templateUrl: './share-qr.component.html',
  styleUrls: ['./share-qr.component.scss']
})
export class ShareQrComponent implements OnInit {

  userData$: Observable<any>;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.userData$ = this.usersService.getUserData();
  }

  public backToShare(): void {
    this.router.navigate(['/share']);
  }

}
