import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-dpi',
  imports: [FormsModule, CommonModule, RouterOutlet, RouterLink, RouterModule],
  templateUrl: './create-dpi.component.html',
  styleUrls: ['./create-dpi.component.css']
})
export class CreateDPIComponent {
  user = {
    firstName: '',
    familyName: '',
    dob: '',
    ssn: '',
    phoneNumber: '',
    address: '',
    emergencyContact: '',
    carePhysician: ''
  };
  isSubmitted = false;

  // Regex for validating phone numbers in Algeria (starts with 05, 06, or 07 and contains 9 digits)
  phoneRegex = /^(05|06|07)[0-9]{8}$/;

  // Regex for validating Social Security Number (exactly 15 digits)
  ssnRegex = /^\d{15}$/;

  onSubmit() {
    this.isSubmitted = true;

    // Check if all fields are filled and valid
    if (this.user.firstName && this.user.familyName && this.user.dob && this.user.ssn && this.user.phoneNumber &&
        this.user.address && this.user.emergencyContact && this.user.carePhysician) {
      
      // Validate phone number
      if (!this.phoneRegex.test(this.user.phoneNumber)) {
        console.log('Invalid phone number format.');
        alert('Please enter a valid Algerian phone number.');
        return;
      }

      // Validate emergency contact phone number
      if (!this.phoneRegex.test(this.user.emergencyContact)) {
        console.log('Invalid emergency contact phone number format.');
        alert('Please enter a valid Algerian emergency contact phone number.');
        return;
      }

      // Validate SSN
      if (!this.ssnRegex.test(this.user.ssn)) {
        console.log('Invalid Social Security Number.');
        alert('Please enter a valid 15-digit Social Security Number.');
        return;
      }

      console.log('Form submitted:', this.user);
      alert('Form submitted successfully!');

      // Reset the form if needed
      this.isSubmitted = false;
      this.user = {
        firstName: '',
        familyName: '',
        dob: '',
        ssn: '',
        phoneNumber: '',
        address: '',
        emergencyContact: '',
        carePhysician: ''
      };
    } else {
      console.log('Form is incomplete.');
    }
  }
}
