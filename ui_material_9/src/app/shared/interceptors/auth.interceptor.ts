import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.currentAuthValue;
    const isLoggedIn = currentUser && currentUser.token;
    // const isApiUrl = req.url.startsWith(config.apiUrl);

    if (isLoggedIn) {
      req = req.clone({
          setHeaders: {
              Authorization: `Bearer ${currentUser.token}`
          }
      });
    }

    return next.handle(req);
  }
}
