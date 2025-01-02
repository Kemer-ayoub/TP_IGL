import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-report-detail-radiologue',
  imports: [CommonModule],
  templateUrl: './report-detail-radiologue.component.html',
  styleUrl: './report-detail-radiologue.component.css'
})
export class ReportDetailRadiologueComponent {
  authService = inject(AuthService);
  error: string | null = null;
  displayCare: any = null; // This will hold our modified data for display

  @Input() selectedCare: any;
  @Output() backToConsultationList: EventEmitter<void> = new EventEmitter();

  ngOnInit() {
    console.log("i tryna put you")
    if (this.selectedCare) {
      console.log("in the worst mood ya")
      // Make a copy of selectedCare
      this.displayCare = { ...this.selectedCare };
      
      // Fetch the doctor's name
      this.authService.getNom(this.selectedCare.medecin).subscribe({
        next: (response) => {
          this.selectedCare.medecin = response;
        },
        error: (error) => {
          console.error('Error fetching DPI:', error);
          this.error = error;
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedCare']) {
      console.log('selectedCare changed:', changes['selectedCare'].currentValue);
      // Logic to handle the new selectedCare
      console.log("i tryna put you")
      if (this.selectedCare) {
        console.log("in the worst mood ya")
        // Make a copy of selectedCare
        this.displayCare = { ...this.selectedCare };
        
        // Fetch the doctor's name
        this.authService.getNom(this.selectedCare.medecin).subscribe({
          next: (response) => {
            this.selectedCare.medecin = response;
          },
          error: (error) => {
            console.error('Error fetching DPI:', error);
            this.error = error;
          }
        });
      }
    }
  }

  constructor() { 
    console.log("selectedCare", this.selectedCare);
  }
  
  onBackToConsultationList() {
    console.log("selectedCare", this.selectedCare);
    this.backToConsultationList.emit();
  }
}
