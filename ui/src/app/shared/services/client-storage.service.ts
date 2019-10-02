import { Injectable } from '@angular/core';
import { ReplaySubject, Subject, Observable } from 'rxjs';
import { filter, startWith } from 'rxjs/operators';

import { Cookies } from './cookies.service';

import { IClientStorageResponse } from '@interfaces/clientstorage-response.interface';

@Injectable({
  providedIn: 'root'
})

export class ClientStorage {

  /** @ignore */
  constructor(private cookies: Cookies) {

    this.storage$
      .pipe(
        filter((key) => !!key)
      )
      .subscribe((key) => {
        this.logger.next({ storage: this.getStorage(), trigger: key });
      }
      );
  }

  private logger = new ReplaySubject<IClientStorageResponse>();
  private storage = new Subject<string>();

  public logger$: Observable<IClientStorageResponse> = this.logger.asObservable()
    .pipe(
      startWith({ storage: this.getStorage(), trigger: null })
    );

  private storage$: Observable<string> = this.storage.asObservable();

  private getStorage() {

    const storage = {};

    let length;

    try {
      length = localStorage.length;
    } catch (err) {
      length = this.cookies.keys().length;
    }

    for (let i = 0; i < length; i++) {

      let value;
      let key;

      try {
        key = localStorage.key(i);
        value = this.getItem(key);
      } catch (err) {
        key = this.cookies.keys()[i];
        value = this.getItem(key);
      }

      storage[key] = value;
    }

    return storage;
  }

  /**
   * @param key The key/property in which the data is stored
   */
  getItem(key: string): any {

    let v;

    try {
      v = localStorage.getItem(key);
    } catch (err) {
      v = this.cookies.getItem(key);
    }

    try {
      v = JSON.parse(v);
    } catch (err) {
      // If the parse failed we just return the original value.
    }

    return v;
  }

  /**
   * @param key The key/property to store the data in
   * @param v The data value to store
   */
  setItem<T>(key: string, v: T): void {

    // Do not save undefined as it makes no sense to do so,
    // null is accepted instead.
    if (v === undefined) {
      return;
    }

    if (typeof v === 'object' && v !== null) {

      try {
        localStorage.setItem(key, JSON.stringify(v));
      } catch (err) {
        this.cookies.setItem(key, JSON.stringify(v));
      }
    } else {

      try {
        localStorage.setItem(key, String(v));
      } catch (err) {
        this.cookies.setItem(key, String(v));
      }
    }

    this.storage.next(key);
  }

  /**
   * @param key The key/property to remove from storage
   */
  removeItem(key: string): void {

    try {
      localStorage.removeItem(key);
    } catch (err) {
      this.cookies.removeItem(key);
    }

    this.storage.next(key);
  }
}
