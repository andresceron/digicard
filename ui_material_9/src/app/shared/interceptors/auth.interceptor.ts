import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from '@services/auth.service';
import { catchError } from 'rxjs/operators';
import { ClientStorage } from '@services/client-storage.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private clientStorage: ClientStorage,
    private router: Router,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.currentAuthValue;
    const isLoggedIn = currentUser && currentUser.token;

    if (isLoggedIn) {
      req = req.clone({
          setHeaders: {
              Authorization: `Bearer ${currentUser.token}`
          }
      });
    }

    return next.handle(req).pipe(
      catchError(
        (err, caught) => {
          if (err.status === 401) {
            this.clientStorage.removeItem( 'currentAuth' );
            this.router.navigate(['/login']);

            return of(err);
          }
          throw err;
        }
      )
    );
  }
}
