import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login-screen',
  imports: [FormsModule, CommonModule],  // Add CommonModule here
  standalone: true,
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent {

  username: string = '';
  password: string = '';
  user?: any;
  isSubmitted: boolean = false;
  authService = inject(AuthService);
  router = inject(Router);
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly API_URL = 'http://127.0.0.1:8000/api/';
  private readonly REFRESH_URL = `${this.API_URL}token/refresh/`;
  private http = inject(HttpClient);
  

  /*constructor() {
    console.log('Login screen initialized');  
    const tokenData = localStorage.getItem(this.JWT_TOKEN);
    console.log('today',tokenData)
    
    if (tokenData) {
      const access_token = JSON.parse(tokenData).access;
      console.log("kdmh", access_token)
      if (this.isTokenExpired(access_token)) {
        // Navigate to the next page if the token is valid
        console.log('Token expired');
        this.router.navigate(['/login']);
      }
      else{
        console.log('Token not expired');
        this.authService.getCurrentAuthUser().subscribe((r) => { 
          this.user = r;
          if (this.user.role === 'PATIENT') {
            this.router.navigate(['/patient']);
          } 
          else if (this.user.role === 'PHARMACIEN') {
            this.router.navigate(['/pharmacien']);
          }
          else if (this.user.role === 'INFIRMIER') {
            this.router.navigate(['/infirmer']);
          }
          else if (this.user.role === 'RADIOLOGUE') {
            this.router.navigate(['/radiologue']);
          }
          else if (this.user.role === 'ADMIN') {
            this.router.navigate(['/createDPI']);
          }
        });
      }
    }
  }*/

  constructor() {
    console.log('Login screen initialized');
    const tokenData = localStorage.getItem(this.JWT_TOKEN);
    console.log('today', tokenData);
  
    if (!tokenData) {
      this.router.navigate(['/login']);
      return;
    }
  
    const parsedTokenData = JSON.parse(tokenData);
    const accessToken = parsedTokenData.access;
    const refreshToken = parsedTokenData.refresh;
    
  
    if (this.isTokenExpired(accessToken) && refreshToken) {
      // Token is expired, try to refresh
      this.http.post<{ access: string, refresh: string }>(
        this.REFRESH_URL,
        { refresh: refreshToken }
      ).subscribe({
        next: (newTokens) => {
          // Save new tokens
          localStorage.setItem(this.JWT_TOKEN, JSON.stringify(newTokens));
          // After refresh, get user and navigate
          this.handleUserNavigation();
        },
        error: (error) => {
          console.error('Token refresh failed:', error);
          this.router.navigate(['/login']);
        }
      });
    } else if (this.isTokenExpired(accessToken)) {
      // Token is expired and no refresh token
      console.log('Token expired');
      this.router.navigate(['/login']);
    } else {
      console.log('Token not expired');
      this.handleUserNavigation();
    }
  }
  
  // Separate method for user navigation logic
  private handleUserNavigation() {
    this.authService.getCurrentAuthUser().subscribe({
      next: (response) => {
        this.user = response;
        this.navigateBasedOnRole(this.user.role);
      },
      error: (error) => {
        this.router.navigate(['/login']);
      }
    });
  }
  
  // Separate method for role-based navigation
  private navigateBasedOnRole(role: string) {
    const roleRoutes: { [key: string]: string } = {
      'PATIENT': '/patient',
      'PHARMACIEN': '/pharmacien',
<<<<<<< HEAD
      'infirmier': '/infirmer',
      'RADIOLOGUE': '/radiologue',
      'ADMIN': '/createDPI',
      'MEDECIN': '/medecin',
    };
  
    const route = roleRoutes[role.toUpperCase()];
    if (route) { 
=======
      'INFIRMIER': '/infirmer',
      'RADIOLOGUE': '/radiologue',
      'ADMIN': '/createDPI'
    };
  
    const route = roleRoutes[role];
    if (route) {
>>>>>>> 1109aeef4c2c5a93517dd75840f96155dc960e5b
      this.router.navigate([route]);
    } else {
      console.error('Unknown role:', role);
      this.router.navigate(['/login']);
    }
  }

  isTokenExpired(token: string): boolean {
    try {
      // Check if token is undefined or empty
      if (!token) {
        console.log("Token is empty or undefined");
        return true;
      }
      const decoded = jwtDecode(token);
      if (!decoded.exp) return true;
      // exp is in seconds, multiply by 1000 to convert to milliseconds
      const expirationDate = new Date(decoded.exp * 1000);
      console.log(expirationDate)
      return expirationDate.valueOf() <= new Date().valueOf();
    } catch {
      return true; // If there's any error decoding, consider token expired
    }
  }
  
  authentication(event: Event) {
    event.preventDefault()

    this.isSubmitted = true;
    if (!this.username || !this.password) {
      return; // If any field is empty, don't proceed
    }

    this.authService
      .login({
        username: this.username,
        password: this.password,
      })
      .subscribe(() => {
        alert('Login success!');
        this.authService.getCurrentAuthUser().subscribe((r) => {
          this.user = r;
          if (this.user.role === 'PATIENT') {
            this.router.navigate(['/patient']);
          } 
          else if (this.user.role === 'PHARMACIEN') {
            this.router.navigate(['/pharmacien']);
          }
          else if (this.user.role === 'INFIRMIER') {
            this.router.navigate(['/infirmer']);
          }
          else if (this.user.role === 'RADIOLOGUE') {
            this.router.navigate(['/radiologue']);
          }
          else if (this.user.role === 'ADMIN') {
            this.router.navigate(['/createDPI']);
          }
        });        
      });
    
    
   
    // Authentication logic (for example, an API call)
    console.log('Authenticating with:', this.username, this.password);
  }
}
