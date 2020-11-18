import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { debounce, first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    private apiService: ApiService
  ) { }

  getContact(contactId: string): any {
    return this.apiService
      .get(`contacts/${contactId}/detail`)
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

  getContacts(userId: string, query: string): any {
    return this.apiService
      .get(`contacts/${userId}/search`, {name: query})
      .pipe(
        // TODO: Add Contact interface
        map((res: any) => {
          console.log(res);
          if (res && res.data) {
            return res.data;
          }
          return false;
        })
    );

  }

  saveContact(contactId: string) {
    return this.apiService
      .patch(`contacts/${contactId}/save`, contactId)
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

  removeContact(contactId: string) {
    return this.apiService
      .delete(`contacts/${contactId}/delete`)
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
