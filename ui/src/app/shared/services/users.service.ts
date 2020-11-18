import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ICustomResponse } from '@interfaces/custom-response.interface';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { IUserResponse } from '@interfaces/user-response.interface';
import { IUser } from '@interfaces/user.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>( undefined );

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {
  }

  public currentAuthValue(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  public get getUserData(): string {
    return this.currentUserSubject.getValue();
  }

  public getUser(userId: string) {
    console.log('inside getUser ', userId);
    return this.apiService
      .get(`users/${userId}`)
      .pipe(
        first(),
        map((res: IUserResponse) => {
          console.log(res);
          if (res && res.data) {
            this.currentUserSubject.next({...res.data});
            return res.data;
          }
          return false;
        })
      );
  }

  public updateUser(userId: string, data: IUser) {
    return this.apiService
      .put( `users/${userId}`, {data: data})
      .pipe(
        first(),
        map((res: IUserResponse) => {
          console.log(res);
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
          console.log(res);
          if (res && res.data) {
            return res.data;
          }
          return false;
        })
      );
  }

}
