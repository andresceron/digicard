import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap, ParamMap, Params } from '@angular/router';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';

@Injectable()
export class AuthServiceStub {
  private loadSubject: BehaviorSubject<any> = new BehaviorSubject<any>({
    _id: 'testId',
    token: 'token',
    email: 'email@email.com'
  });

  currentAuth(): Observable<any> {
    return this.loadSubject;
  }

  login(obj: { email: string, password: string }) {
    return of().pipe();
  }

  register(obj: { firstName: string, lastName: string, email: string, password: string }) {
    return of().pipe();
  }

  validateResetPasswordToken(token: string) {
    return of().pipe();
  }

  resetPassword(email: string) {
    return of().pipe();
  }

  newPassword(obj: { token: string, password: string }) {
    return of().pipe();
  }

  get currentAuthValue() {
    return this.loadSubject.value;
  }
}

@Injectable()
export class ContactsServiceStub {
  getContacts(userId: string, query: string) {
    return of().pipe();
  }

  getContact(userId: string) {
    return of().pipe();
  }

  removeContact(userId: string) {
    return of().pipe();
  }

  saveContact(userId: string) {
    return of().pipe();
  }

}

@Injectable()
export class UsersServiceStub {
  getUser(userId: string) {
    return of().pipe();
  }

  getUserData(userId: string) {
    return of().pipe();
  }

}

@Injectable()
export class ClientStorageStub {
}

@Injectable()
export class ApiServiceStub {
  get(url, params, headers, responseType) {
    return of().pipe();
  }
}

export class ActivatedRouteStub implements Partial<ActivatedRoute> {
  private _params: {};
  private paramMapSubject = new ReplaySubject<ParamMap>();
  private subject = new ReplaySubject<Params>();

  readonly paramsData = this.subject.asObservable();

  get snapshot(): ActivatedRouteSnapshot {
    const snapshot: Partial<ActivatedRouteSnapshot> = {
      params: this._params,
    };

    return snapshot as ActivatedRouteSnapshot;
  }

  get paramMap(): Observable<ParamMap> {
    return this.paramMapSubject.asObservable();
  }

  constructor(initialParams?: Params) {
    this.setParamMap(initialParams);
  }

  setParamMap(params?: Params) {
    this._params = params;
    this.paramMapSubject.next(convertToParamMap(params));
    this.subject.next(params);
  }
}
