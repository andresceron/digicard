import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ICustomResponse } from '@interfaces/custom-response.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { IAuthResponse } from '@interfaces/auth-response.interface';
import { UsersService } from './users.service';
import { ClientStorage } from './client-storage.service';
import { AppConstants } from '@constants/app-constants.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line:max-line-length
  private currentAuthSubject: BehaviorSubject<IAuthResponse> = new BehaviorSubject<IAuthResponse>(undefined);
  private token: string;

  constructor(
    private apiService: ApiService,
    private usersService: UsersService,
    private cs: ClientStorage
  ) {
    this.cs.logger$.subscribe(data => {
      this.currentAuthSubject.next(data.storage[AppConstants.authState]);
    });
  }

  public get currentAuthValue(): IAuthResponse {
    return this.currentAuthSubject.value;
  }

  public currentAuth(): Observable<IAuthResponse> {
    return this.currentAuthSubject.asObservable();
  }

  public login(obj: object) {
    return this.apiService
      .post('auth/login', obj)
      .pipe(
        first(),
        map((res: ICustomResponse) => {
          if (res?.data?.user?._id && res?.data?.user?.token) {
            this.cs.setItem(AppConstants.authState, res.data.user);
            this.token = res.data.user.token;
            this.usersService.setUser(res.data.user._id);
          }

          return res?.data?.user;
        })
      );
  }

  public register(obj: object) {
    return this.apiService
      .post('auth/register', obj)
      .pipe(
        first(),
        map((res: ICustomResponse) => {
          if (res?.data?._id) {
            return res.data;
          }
        })
      );
  }

  public resetPassword(obj: object) {
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

  public validateResetPasswordToken(obj: object) {
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

  public newPassword(obj: object) {
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

  public logout() {
    // remove user from local storage to log user out
    this.token = null;
    this.cs.removeItem(AppConstants.authState);
    this.currentAuthSubject.next(null);
  }

}
