import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment';

@Injectable()
export class PostsService {
  private config = {
    host: environment.serverUrl
  };

  constructor(
    private http: HttpClient
  ) {}

  public get<T>(url: string, params?: { [key: string]: any }, headers?: HttpHeaders, responseType?: string): Observable<T> {
    return this.http.get<T>(this.config.host + url);
  }

}
