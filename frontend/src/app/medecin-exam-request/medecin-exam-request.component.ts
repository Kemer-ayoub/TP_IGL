import { Component,EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medecin-exam-request',
  imports: [],
  templateUrl: './medecin-exam-request.component.html',
  styleUrl: './medecin-exam-request.component.css'
})
export class MedecinExamRequestComponent {
  priority: string = 'Standard';  // Default value for priority
  medicalJustification: string = '';
  testDate: string = '';
  doctorName: string = '';
  @Output() toggleExamRequest= new EventEmitter<void>();

  constructor(private router: Router) {}
  cancel() {
    this.toggleExamRequest.emit();
  }

}
