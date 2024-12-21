import { Component,Input, Output, EventEmitter } from '@angular/core';
import { PatientComponent } from '../patient/patient.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-prescriptions-list',
  imports: [PatientComponent,CommonModule,FormsModule],
  templateUrl: './prescriptions-list.component.html',
  styleUrl: './prescriptions-list.component.css'
})
export class PrescriptionsListComponent {

}

 
