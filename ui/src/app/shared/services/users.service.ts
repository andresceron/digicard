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

  constructor(
    private apiService: ApiService
  ) {
  }

  public getUserData(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  public setUser(userId: string) {
    return this.apiService
    .get(`users/${userId}`)
    .pipe(
      first()
    ).subscribe((res: IUserResponse) => {
      if (res && res.data) {
        this.currentUserSubject.next(res.data);
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

  public saveContact(userId: string, contactId: string) {
    return this.apiService
      .patch(`users/${userId}`, contactId)
      .pipe(
        first(),
        // TODO: Add Contact Interface
        map((res: any) => {
          if (res && res.data) {
            return res.data;
          }
          return false;
        })
      );
  }

}
