import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ICustomResponse } from '@interfaces/custom-response.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { IUserResponse } from '@interfaces/user-response.interface';
import { IUser } from '@interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
  currentUser: Observable<any> = this.currentUserSubject.asObservable();

  constructor(
    private apiService: ApiService
  ) { }

  public get currentAuthValue() {
    console.log('this.currentUserSubject.value', this.currentUserSubject.value);
    return this.currentUserSubject.value;
  }

  getUser(userId) {
    return this.apiService
      .get(`users/${userId}`)
      .pipe(
        first(),
        map((res: IUserResponse) => {
          console.log(res);
          if (res && res.data) {
            localStorage.setItem('currentUser', JSON.stringify(res.data));
            this.currentUserSubject.next({...res.data});
            return res.data;
          }
          return false;
        })
      );
  }

  updateUser(userId: string, data: IUser) {
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

}
