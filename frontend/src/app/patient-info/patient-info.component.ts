import { Component,Input, Output } from '@angular/core';
import { PatientComponent } from '../patient/patient.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-info',
  imports: [PatientComponent,CommonModule,FormsModule],
  templateUrl: './patient-info.component.html',
  styleUrl: './patient-info.component.css'
})
export class PatientInfoComponent {

  @Input() patient: any;
  ngOnInit(): void {
    console.log('Patient data on init:', this.patient);
  }
}
