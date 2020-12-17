import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ICustomResponse } from '@interfaces/custom-response.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentAuthSubject: BehaviorSubject<any> = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentAuth')));
  currentAuth: Observable<any> = this.currentAuthSubject.asObservable();

  private token: string;

  constructor(
    private apiService: ApiService
  ) { }

  public get currentAuthValue() {
    return this.currentAuthSubject.value;
  }

  login(obj: object) {
    return this.apiService
      .post('auth/login', obj)
      .pipe(
        first(),
        map((res: ICustomResponse) => {
          if (res?.data?.user && res?.data?.user?.token) {
            this.token = res.data.user.token;
            localStorage.setItem('currentAuth', JSON.stringify(res.data.user));
            this.currentAuthSubject.next({...res.data.user});
          }

          return res?.data?.users;
        })
      );
  }

  register(obj: object) {
    return this.apiService
      .post('auth/register', obj)
      .pipe(
        first(),
        map((res: ICustomResponse) => {
          if (res && res.data && res.data._id) {
            return res.data;
          }
        })
      );
  }

  resetPassword(obj: object) {
    return this.apiService
        .post('auth/reset-password', obj)
        .pipe(
          first(),
          map((res: ICustomResponse) => {
            if (res?.data?.status) {
              return res.data.status;
            }
          })
        );
  }

  validateResetPasswordToken(obj: object) {
    return this.apiService
        .post('auth/validate-password-token', obj)
        .pipe(
          first(),
          map((res: ICustomResponse) => {
            if (res?.data?.status) {
              return res.data.status;
            }
          })
        );
  }

  newPassword(obj: object) {
    return this.apiService
        .post('auth/new-password', obj)
        .pipe(
          first(),
          map((res: ICustomResponse) => {
            if (res?.data) {
              return res.data;
            }
          })
        );
  }

  social(target) {
    console.log(target);
    return this.apiService
        .get('auth/google')
        .pipe(
          first(),
          map((res: ICustomResponse) => {
            if (res) {
              console.log(res);
              return res;
            }
          })
        );
  }

  logout() {
    // remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentAuth');
    this.currentAuthSubject.next(null);
  }

}
