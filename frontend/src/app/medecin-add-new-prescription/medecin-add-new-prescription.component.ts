import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

interface Medication {
  name: string;
  dose: string;
  duration: string;
}

@Component({
  selector: 'app-medecin-add-new-prescription',
  imports: [FormsModule],
  templateUrl: './medecin-add-new-prescription.component.html',
  styleUrls: ['./medecin-add-new-prescription.component.css']
})
export class MedecinAddNewPrescriptionComponent {
}
