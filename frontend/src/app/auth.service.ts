import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Replace these URLs with your backend endpoints
  private readonly API_URL = 'http://127.0.0.1:8000/api/';
  private readonly LOGIN_URL = `${this.API_URL}token/`;
  private readonly PROFILE_URL = `${this.API_URL}user_info/`;
  private readonly DPI_URL = `${this.API_URL}dpi-detail/`;
  private readonly USER_URL = `${this.API_URL}user_id/`;
  private readonly REFRESH_URL = `${this.API_URL}token/refresh/`;
  private readonly USERNOM_URL = `${this.API_URL}user-nom/`;

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private router = inject(Router);
  private http = inject(HttpClient);

  constructor() {}

  login(user: { username: string; password: string }): Observable<any> {
    return this.http
      .post(this.LOGIN_URL, user)
      .pipe(
        tap((tokens: any) =>
          this.doLoginUser(user.username, JSON.stringify(tokens))
        )
      );
  }

  private doLoginUser(username: string, token: any) {
    this.loggedUser = username;
    this.storeJwtToken(token);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  getCurrentAuthUser() {
    const makeRequest = (token: string) => {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
      return this.http.get(this.PROFILE_URL, { headers });
    };
  
    const tokenData = JSON.parse(localStorage.getItem(this.JWT_TOKEN) || '{}');
    const accessToken = tokenData.access;
  
    if (!accessToken) {
      return throwError(() => new Error('Access token not found.'));
    }
  
    return makeRequest(accessToken).pipe(
      catchError((error) => {
        if (error.status === 401) {
          const refreshToken = tokenData.refresh;
          
          if (!refreshToken) {
            return throwError(() => new Error('Refresh token not found'));
          }
  
          // Call refresh token endpoint
          return this.http.post<{ access: string, refresh: string }>(
            this.REFRESH_URL, 
            { refresh: refreshToken }
          ).pipe(
            switchMap(newTokens => {
              // Save new tokens
              localStorage.setItem(this.JWT_TOKEN, JSON.stringify(newTokens));
              // Retry the original request with new token
              return makeRequest(newTokens.access);
            }),
            catchError(refreshError => {
              // If refresh fails, clear tokens
              localStorage.removeItem(this.JWT_TOKEN);
              return throwError(() => new Error('Token refresh failed'));
            })
          );
        }
        return throwError(() => error);
      })
    );
  }

  getAccessToken(): string {
    return localStorage.getItem('JWT_TOKEN') || '';
  }

  isLoggedIn() {
    return !!localStorage.getItem(this.JWT_TOKEN);
  }

  isTokenExpired() {
    const tokens = localStorage.getItem(this.JWT_TOKEN);
    if (!tokens) return true;
    const token = JSON.parse(tokens).access_token;
    const decoded = jwtDecode(token);
    if (!decoded.exp) return true;
    const expirationDate = decoded.exp * 1000;
    const now = new Date().getTime();

    return expirationDate < now;
  }

  refreshToken() {
    console.log('Refreshing token...');
    let tokens: any = localStorage.getItem(this.JWT_TOKEN);
    if (!tokens) return;
    tokens = JSON.parse(tokens);
    let refreshToken = tokens.refresh_token;
    return this.http
      .post<any>(this.REFRESH_URL, {
        refreshToken,
      })
      .pipe(tap((tokens: any) => this.storeJwtToken(JSON.stringify(tokens))));
  }

  getUserByUsername(nom: string) {
    const tokenData = JSON.parse(localStorage.getItem(this.JWT_TOKEN) || '{}');
    const accessToken = tokenData.access;
  
    if (!accessToken) {
      return throwError(() => new Error('Access token not found.'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });
    
    // For GET request with body, we need to use the observe option
    return this.http.get(this.USER_URL,  {
      headers: headers,
      params: { nom: nom }
    });
  }

  getNom(id: any): Observable<any>{
    const makeRequest = (token: string) => {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
      return this.http.get(this.USERNOM_URL, { headers , params: {id: id}}); 
    };
    const tokenData = JSON.parse(localStorage.getItem(this.JWT_TOKEN) || '{}');
    const accessToken = tokenData.access;
  
    if (!accessToken) {
      return throwError(() => new Error('Access token not found.'));
    }
  
    return makeRequest(accessToken).pipe(
      catchError((error) => {
        if (error.status === 401) {
          const refreshToken = tokenData.refresh;
          
          if (!refreshToken) {
            return throwError(() => new Error('Refresh token not found'));
          }
  
          // Call refresh token endpoint
          return this.http.post<{ access: string, refresh: string }>(
            this.REFRESH_URL, 
            { refresh: refreshToken }
          ).pipe(
            switchMap(newTokens => {
              // Save new tokens
              localStorage.setItem(this.JWT_TOKEN, JSON.stringify(newTokens));
              // Retry the original request with new token
              return makeRequest(newTokens.access);
            }),
            catchError(refreshError => {
              // If refresh fails, clear tokens
              localStorage.removeItem(this.JWT_TOKEN);
              return throwError(() => new Error('Token refresh failed'));
            })
          );
        }
        return throwError(() => error);
      })
    );
  }

    /*startTokenRefresh() {
      // Refresh token every 5 minutes (assuming a 15-minute token lifespan)
      interval(5 * 60 * 1000).subscribe(() => {
        this.refreshToken()?.subscribe(() => {
          console.log('Token refreshed successfully');
        });
      });
    }*/
}