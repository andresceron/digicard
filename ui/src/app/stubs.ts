import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params } from '@angular/router';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
export class ClientStorageStub {
}

@Injectable()
export class ApiServiceStub {
  get(url, params, headers, responseType) {
    return of().pipe();
  }
}

@Injectable()
export class ActivatedRouteStubOld {
    subject = new Subject<any>();
    params = {};
    queryParams = {};
    data = this.subject;
    snapshot = {
        params: {}
    };
}

export class ActivatedRouteStub implements Partial<ActivatedRoute> {
  private _params: {};
  private subject = new ReplaySubject<any>();

  paramMap = this.subject.asObservable();
  get snapshot(): ActivatedRouteSnapshot {
    const snapshot: Partial<ActivatedRouteSnapshot> = {
      params: this._params,
    };

    return snapshot as ActivatedRouteSnapshot;
  }

  constructor(initialParams?: Params) {
    this.setParamMap(initialParams);
  }

  setParamMap(params?: Params) {
    this._params = params;
    this.subject.next(params);
  }
}
