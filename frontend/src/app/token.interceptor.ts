import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  authService = inject(AuthService);
  constructor() {
    console.log('Token interceptor initialized');
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401) {
          // Unauthorized error: try refreshing the token
          return this.authService.refreshToken()!.pipe(
            switchMap(() => {
              // Retry the original request with the new token
              const clonedRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${this.authService.getAccessToken()}`
                }
              });
              return next.handle(clonedRequest);
            }),
            catchError(err => {
              // If refresh fails, log out the user or take appropriate action
              this.authService.logout();
              return throwError(() => new Error(err));
            })
          );
        }

        return throwError(() => new Error(error));
      })
    );
  }
}
