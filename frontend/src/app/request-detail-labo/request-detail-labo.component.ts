<<<<<<< HEAD
import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
=======
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
>>>>>>> 1109aeef4c2c5a93517dd75840f96155dc960e5b
@Component({
  selector: 'app-request-detail-labo',
  imports: [CommonModule],
  templateUrl: './request-detail-labo.component.html',
  styleUrl: './request-detail-labo.component.css'
})
export class RequestDetailLaboComponent {
<<<<<<< HEAD
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

=======
  @Input() selectedCare: any;
  @Output() backToConsultationList: EventEmitter<void> = new EventEmitter();
>>>>>>> 1109aeef4c2c5a93517dd75840f96155dc960e5b
  onBackToConsultationList() {
    this.backToConsultationList.emit();
  }
}
