import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, RouterModule } from '@angular/router';
import { DpiService } from '../dpi.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create-dpi',
  imports: [FormsModule, CommonModule, RouterOutlet, RouterLink, RouterModule],
  templateUrl: './create-dpi.component.html',
  styleUrls: ['./create-dpi.component.css']
})
export class CreateDPIComponent {
  dpiService = inject(DpiService);
  authService = inject(AuthService);
  user = {
    nom: '',
    prenom: '',
    mot_passe: 'nimportrequoi',
    date_naissance: '',
    adresse: '',
    telephone: '',
    nss: '',
    mutuelle: 'adhesion',
    num_pers_contact: '',
    medecin_traitant: null,
    patient: null
  };
  isSubmitted = false;
  successMessage: string = '';
  errorMessage: string = '';

  // Regex for validating phone numbers in Algeria (starts with 05, 06, or 07 and contains 9 digits)
  phoneRegex = /^(05|06|07)[0-9]{8}$/;

  // Regex for validating Social Security Number (exactly 15 digits)
  nssRegex = /^\d{15}$/;

  onSubmit() {
    this.isSubmitted = true;
    // Check if all fields are filled and valid
    if (this.user.nom && this.user.prenom && this.user.date_naissance && this.user.nss && this.user.telephone &&
        this.user.adresse && this.user.num_pers_contact && this.user.medecin_traitant) {
      
      // Validate phone number
      if (!this.phoneRegex.test(this.user.telephone)) {
        console.log('Invalid phone number format.');
        alert('Please enter a valid Algerian phone number.');
        return;
      }

      // Validate emergency contact phone number
      if (!this.phoneRegex.test(this.user.num_pers_contact)) {
        console.log('Invalid emergency contact phone number format.');
        alert('Please enter a valid Algerian emergency contact phone number.');
        return;
      }

      // Validate nss
      if (!this.nssRegex.test(this.user.nss)) {
        console.log('Invalid Social Security Number.');
        alert('Please enter a valid 15-digit Social Security Number.');
        return;
      }



      console.log('Form submitted:', this.user);
      alert('Form submitted successfully!');
      this.authService.getUserByUsername(this.user.medecin_traitant).subscribe({
        next: (response: any) => {
          if (response && response.id) {
            console.log('User found:', response);
            console.log('the problem 1',response.id)
            this.user.medecin_traitant = response.id;
          }
          this.authService.getUserByUsername(this.user.nom).subscribe({
            next: (response: any) => {
              if (response && response.id) {
                console.log('User found:', response);
                console.log('the problem 0222',response.id)
                this.user.patient = response.id;
              }
              this.dpiService.createDpi(this.user).subscribe({
                next: (response) => {
                  this.successMessage = 'DPI created successfully!';
                  // Reset the form if needed
                  this.isSubmitted = false;
                  this.user = {
                    nom: '',
                    prenom: '',
                    mot_passe: 'nimportrequoi',
                    date_naissance: '',
                    adresse: '',
                    telephone: '',
                    nss: '',
                    mutuelle: 'adhesion',
                    num_pers_contact: '',
                    medecin_traitant: null,
                    patient: null
                  };
                },
                error: (error) => {
                  this.errorMessage = 'Failed to create DPI. Please try again.';
                }
              });
            },
            error: (error) => {
              this.errorMessage = 'Failed to get user. Please try again.';}
          });
          
        },
        error: (error) => {
          this.errorMessage = 'Failed to get user. Please try again.';}
      });
      
    } else {
      console.log('Form is incomplete.');
    }
  }
}
