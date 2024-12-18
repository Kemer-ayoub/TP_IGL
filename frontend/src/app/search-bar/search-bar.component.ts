import { Component,EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientComponent } from '../patient/patient.component';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule,FormsModule,PatientComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  ssn: string = ''; // Propriété pour stocker le SSN saisi

  @Output() ssnEntered = new EventEmitter<string>();

  // Méthode pour émettre l'événement avec le SSN
  onSearch() {
    this.ssnEntered.emit(this.ssn);
  }
}
