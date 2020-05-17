import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ICustomResponse } from '@interfaces/custom-response.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
  currentUser: Observable<any> = this.currentUserSubject.asObservable();

  private token: string;

  constructor(
    private apiService: ApiService
  ) { }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(obj) {
    return this.apiService
        .post('auth/login', obj)
        .pipe(
          first(),
          map((res: ICustomResponse) => {
            if (res && res.data && res.data.user && res.data.user.token) {
              this.token = res.data.user.token;
              localStorage.setItem('currentUser', JSON.stringify(res.data.user));
              this.currentUserSubject.next({...res.data.user});
            }
            return res.data.user;
          })
        );
  }

  register(obj) {
    return this.apiService
        .post('auth/register', obj)
        .pipe(
          first(),
          map((res: ICustomResponse) => {
          if (res && res.data && res.data._id) {
              return res.data;
            }
            // return false;
          })
        );
  }

  logout() {
    // remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
