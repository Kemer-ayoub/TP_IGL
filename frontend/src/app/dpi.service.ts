import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DpiService {
  private readonly API_URL = 'http://127.0.0.1:8000/api/';
  private readonly DPI_URL = `${this.API_URL}dpi-nss/`;
  private readonly REFRESH_URL = `${this.API_URL}token/refresh/`;

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private http = inject(HttpClient);
  

  constructor() {}

  createDpi(dpiData: any): Observable<any> {
      const makeRequest = (token: string) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.post(this.DPI_URL, dpiData, { headers });
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

    getDpi(nss: any): Observable<any> { 
      const makeRequest = (token: string) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.get(this.DPI_URL, { headers, params: {nss: nss} });      
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
    

}
