import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  isSubmitted: boolean = false;

  authentication() {
    this.isSubmitted = true;
    if (!this.username || !this.password) {
      return; // If any field is empty, don't proceed
    }
    // Authentication logic (for example, an API call)
    console.log('Authenticating with:', this.username, this.password);
  }
}
