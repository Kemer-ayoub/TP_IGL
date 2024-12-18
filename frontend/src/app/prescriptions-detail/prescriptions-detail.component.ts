import { Component,Input, Output, EventEmitter } from '@angular/core';
import { PatientComponent } from '../patient/patient.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-prescriptions-detail',
  imports: [PatientComponent,CommonModule,FormsModule],
  templateUrl: './prescriptions-detail.component.html',
  styleUrl: './prescriptions-detail.component.css'
})
export class PrescriptionsDetailComponent {
  
}