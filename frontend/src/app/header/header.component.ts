import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  authService = inject(AuthService);
  

  logout() {
    this.authService.logout();
  }

}
