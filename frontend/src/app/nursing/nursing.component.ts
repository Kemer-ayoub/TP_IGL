import { Component,Input, Output, EventEmitter } from '@angular/core';
import { PatientComponent } from '../patient/patient.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-nursing',
  imports: [PatientComponent,CommonModule,FormsModule],
  templateUrl: './nursing.component.html',
  styleUrl: './nursing.component.css'
})
export class NursingComponent {
  @Input() patient: any;
  @Input() showNursingCareList: boolean = false;
  @Input() selectedNursingCare: any = null;


  // Initialize EventEmitters in the constructor
  @Output() backToPatientInfoNursing: EventEmitter<void> = new EventEmitter();
  @Output() selectNursingCare: EventEmitter<any> = new EventEmitter();
  @Output() backToNursingCareList: EventEmitter<void> = new EventEmitter();
  @Input() selectedNursingCareIndex: number | null = null; 
  

  // Method to handle selection of a nursing care item
  onSelectNursingCare(nursingCare: any, index: number) {
    this.selectNursingCare.emit({ nursingCare, index });
  }

  // Method to go back to patient info view
  onBackToPatientInfoNursing() {
    this.backToPatientInfoNursing.emit();
  }

  // Method to go back to nursing care list view
  onBackToNursingCareList() {
    this.backToNursingCareList.emit();
  }
  
  
}


