import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, ReplaySubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { IUserResponse } from '@interfaces/user-response.interface';
import { IUser } from '@interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private currentUserSubject: ReplaySubject<any> = new ReplaySubject<any>(1);
  private user: IUser;

  constructor(
    private apiService: ApiService
  ) {
  }

  public getUserData(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  public get hasUser() {
    return !!this.user?._id;
  }

  public setUser(userId: string) {
    this.apiService
    .get(`users/${userId}`)
    .pipe(
      first()
    ).subscribe((res: IUserResponse) => {
      if (res && res.data) {
        this.currentUserSubject.next(res.data);
        this.user = res.data;
      }
    });
  }

  public getUser(userId: string) {
    return this.apiService
      .get(`users/${userId}`)
      .pipe(
        first(),
        map((res: IUserResponse) => {
          if (res && res.data) {
            this.currentUserSubject.next({...res.data});
            return res.data;
          }
          return;
        })
      );
  }

  public updateUser(userId: string, data: IUser) {
    return this.apiService
      .put( `users/${userId}`, {data: data})
      .pipe(
        first(),
        map((res: IUserResponse) => {
          if (res && res.data) {
            return res.data;
          }
          return false;
        })
      );
  }

  public deleteUser(userId: string) {
    return this.apiService
      .delete( `users/${userId}`)
      .pipe(
        first(),
        map((res: IUserResponse) => {
          if (res && res.data) {
            return res.data;
          }
          return false;
        })
      );
  }

}
