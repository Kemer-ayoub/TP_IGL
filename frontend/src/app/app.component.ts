import { Component } from '@angular/core';
import { RouterLink, RouterOutlet,RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { PatientComponent } from './patient/patient.component';


@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,RouterLink,RouterModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  
  
}
