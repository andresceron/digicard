import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { environment } from 'environments/environment';
import { first, map, catchError } from 'rxjs/operators';

const url = 'http://localhost:3000/upload';

@Injectable()
export class UploadService {
  constructor(
    private apiService: ApiService,
    private httpClient: HttpClient
  ) {}

  upload( path: string, file: any ) {
    console.log( 'assss', path, file );
    const options = {
      reportProgress: true,
      observe: 'events'
    };

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set( 'accept', 'application/json' );

    const formData: FormData = new FormData();
    formData.append(path, file);

    return this.apiService.upload( 'upload/', formData, {
        reportProgress: true,
        headers: headers
      })
      .pipe(
        first(),
        map((res: any) => {
          if (res && res.data) {
            return res.data;
          }
          return false;
        })
      );
  }

}
