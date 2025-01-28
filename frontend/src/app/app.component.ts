import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet,RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { filter } from 'rxjs/operators';
import { PatientComponent } from './patient/patient.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,RouterLink,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  authservice = inject(AuthService)
  title = 'frontend';
  
  
}
