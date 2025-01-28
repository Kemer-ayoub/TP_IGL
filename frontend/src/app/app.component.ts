import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet,RouterModule, Router } from '@angular/router';
<<<<<<< HEAD
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
=======
import { FormsModule } from '@angular/forms';
>>>>>>> 1109aeef4c2c5a93517dd75840f96155dc960e5b
import { NgModule } from '@angular/core';
import { filter } from 'rxjs/operators';
import { PatientComponent } from './patient/patient.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  standalone:true,
<<<<<<< HEAD
  imports: [RouterOutlet,RouterLink,RouterModule,FormsModule,ReactiveFormsModule],
=======
  imports: [RouterOutlet,RouterLink,RouterModule,FormsModule],
>>>>>>> 1109aeef4c2c5a93517dd75840f96155dc960e5b
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  authservice = inject(AuthService)
  title = 'frontend';
  
  
}
