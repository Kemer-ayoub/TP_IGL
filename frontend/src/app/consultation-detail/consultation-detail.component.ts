import { Component, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { PatientComponent } from '../patient/patient.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultation-detail',
  imports: [CommonModule,FormsModule,PatientComponent],
  templateUrl: './consultation-detail.component.html',
  styleUrl: './consultation-detail.component.css'
})
export class ConsultationDetailComponent {
  @Input() consultation: any; // La consultation à afficher
  ngOnChanges(changes: SimpleChanges) {
    if (changes['consultation']) {
      console.log('Consultation reçue dans le composant enfant:', this.consultation);
      console.log('Prescriptions:', this.consultation?.prescriptions); // Affichez les prescriptions
    }
  }
}
