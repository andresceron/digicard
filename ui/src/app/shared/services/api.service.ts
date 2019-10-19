import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment';

@Injectable()
export class ApiService {
  private config = {
    host: environment.serverUrl
  };

  constructor(
    private http: HttpClient) {}

  private getRequestOptions(params?: any, customHeaders?: HttpHeaders, responseType = 'json') {
    let defaultHeaders: HttpHeaders = new HttpHeaders();
    defaultHeaders = defaultHeaders.set('Content-Type', 'application/json');

    if (responseType === void 0) {
      responseType = 'json';
    }

    return {
      headers: customHeaders || defaultHeaders,
      params: params ? params : null,
      responseType: responseType as any
    };
  }

  async get<T>(url: string, params?: { [key: string]: any }, headers?: HttpHeaders, responseType?: string): Promise<T> {
    return this.http.get<T>(this.config.host + url, this.getRequestOptions(params, headers, responseType)).toPromise();
  }

  async post<T>(url: string, data: any, params?: { [key: string]: any }): Promise<T> {
    return this.http.post<T>(this.config.host + url, {data: data}, this.getRequestOptions(params)).toPromise();
  }

  public put<T>(url: string, data: any, params?: { [key: string]: any }): Promise<T> {
    return this.http.put<T>(this.config.host + url, {data: data}, this.getRequestOptions(params)).toPromise();
  }

  public delete<T>(url: string, params?: { [key: string]: any }): Promise<T> {
    return this.http.delete<T>(this.config.host + url, this.getRequestOptions(params)).toPromise();
  }

  public patch<T>(url: string, data: any, params?: { [key: string]: any }): Promise<T> {
    return this.http.patch<T>(this.config.host + url, {data: data}, this.getRequestOptions(params)).toPromise();
  }

}
