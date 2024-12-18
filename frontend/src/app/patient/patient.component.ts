import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { PatientInfoComponent } from '../patient-info/patient-info.component';
import { PrescriptionsListComponent } from '../prescriptions-list/prescriptions-list.component';
import { PrescriptionsDetailComponent } from '../prescriptions-detail/prescriptions-detail.component';
import { ConsultationListComponent } from '../consultation-list/consultation-list.component';
import { ConsultationDetailComponent } from '../consultation-detail/consultation-detail.component';
@Component({
  selector: 'app-patient',
  imports: [FormsModule, ConsultationDetailComponent, CommonModule, ConsultationListComponent, HeaderComponent, SearchBarComponent, PatientInfoComponent, PrescriptionsDetailComponent, PrescriptionsListComponent],
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent {
  patients = [
    {
      ssn: '11111',
      firstName: 'Oussama',
      lastName: 'Benhebbadj',
      address: 'Algiers',
      phoneNumber: '0796201008',
      dob: '23/07/2003',
      emergencyContact: '0662890634',
      carePhysician: 'doctorX',
      consultations: [
        {
          date: '2023-04-20',
          doctorName: 'Dr. Amina',
          notes: 'Routine check-up',
          summary: 'Routine check-up with Dr. Amina, prescriptions include Paracetamol and Ibuprofen.',
          prescriptions: [
            { name: 'Paracetamol', dose: '500mg', duration: '7 days' },
            { name: 'Ibuprofen', dose: '200mg', duration: '5 days' }
          ]
        },
        {
          date: '2023-08-10',
          doctorName: 'Dr. Samir',
          notes: 'Follow-up visit',
          summary: 'Follow-up visit with Dr. Samir, prescription includes Aspirin.',
          prescriptions: [
            { name: 'Aspirin', dose: '100mg', duration: '10 days' }
          ]
        }
      ],
      nursingCare: [
        {
          date: '2023-06-15',
          time: '10:00 AM',
          type: 'Wound Dressing',
          description: 'Dressing of a wound on the left arm.',
          observations: 'Healing well, no signs of infection.'
        },
        {
          date: '2023-07-01',
          time: '09:30 AM',
          type: 'Injection',
          description: 'Vitamin B12 injection administered.',
          observations: 'No adverse reactions observed.'
        }
      ]

    },
    {
      ssn: '22222',
      firstName: 'John',
      lastName: 'Doe',
      address: 'Oran',
      phoneNumber: '0777333444',
      dob: '15/09/1990',
      emergencyContact: '0668333777',
      carePhysician: 'doctorY',
      consultations: [
        {
          date: '2024-02-10',
          doctorName: 'Dr. John',
          notes: 'Initial consultation',
          summary: 'Initial consultation with Dr. John, prescriptions include Amoxicillin and Loratadine.',
          prescriptions: [
            { name: 'Amoxicillin', dose: '250mg', duration: '7 days' },
            { name: 'Loratadine', dose: '10mg', duration: '7 days' }
          ]
        }
      ]
    },
    {
      ssn: '33333',
      firstName: 'Jane',
      lastName: 'Smith',
      address: 'Tlemcen',
      phoneNumber: '0798123456',
      dob: '02/11/1985',
      emergencyContact: '0669123456',
      carePhysician: 'doctorZ',
      consultations: [
        {
          date: '2023-12-20',
          doctorName: 'Dr. Sarah',
          notes: 'Diabetes management',
          summary: 'Diabetes management consultation with Dr. Sarah, prescription includes Metformin.',
          prescriptions: [
            { name: 'Metformin', dose: '500mg', duration: '30 days' }
          ]
        }
      ]
    }
  ];



  ssn: string = '';
  patient: any = null;
  errorMessage: string = '';
  showPrescriptionsList: boolean = false;
  selectedPrescription: any = null;
  selectedConsultation: any = null;
  showConsultationsList: boolean = false;
  showNursingCareList: boolean = false;
  selectedNursingCare: any = null

  searchPatient() {
    this.errorMessage = '';
    this.patient = this.patients.find(patient => patient.ssn === this.ssn);
    if (!this.patient) {
      this.errorMessage = 'Patient not found!';
    }
  }
  onSSNEntered(ssn: string) {
    this.ssn = ssn;
    this.searchPatient();
  }

  // Méthode pour afficher la liste des prescriptions

  onViewConsultations() {
    this.showConsultationsList = true;  // Show consultations list
  }
  selectConsultation(consultation: any) {
    console.log('Consultation sélectionnée:', consultation);

    if (!consultation) {
      // Si aucune consultation n'est sélectionnée, affiche la liste des consultations
      this.showConsultationsList = true;
      this.selectedConsultation = null;
      this.selectedPrescription = null;
    } else {
      // Si une consultation est sélectionnée, masque la liste et affiche les détails
      this.selectedConsultation = consultation;
      this.showConsultationsList = false;
      this.selectedPrescription = null;
    }
  }
  backToConsultationList() {
    this.selectedConsultation = null;
    this.showConsultationsList = true;
    this.showPrescriptionsList = true;
    this.selectedPrescription = null;
  }

  backToPatientInfoConsultation() {
    this.showConsultationsList = false;
    this.selectedConsultation = null;
    this.selectedPrescription = null;
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////
  calculateAge(dob: string): number {
    // Split the dob string into day, month, and year
    const [day, month, year] = dob.split('/').map(num => parseInt(num, 10));

    // Create a new Date object with the correct format (mm/dd/yyyy)
    const birthDate = new Date(year, month - 1, day);  // months are 0-indexed
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // Adjust age if birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  }



  selectPrescription(prescription: any) {
    if (prescription === null) {
      this.selectedPrescription = null;
      this.showPrescriptionsList = false;
    } else {
      // Si la prescription est un objet unique, le convertir en tableau
      this.selectedPrescription = {
        ...prescription,  // Copier les données de la prescription
        medicaments: Array.isArray(prescription.medicaments) ? prescription.medicaments : [prescription]  // S'assurer que medicaments est un tableau
      };
      this.showPrescriptionsList = false;
      console.log('Prescription sélectionnée:', this.selectedPrescription);
    }
  }

  onViewPrescriptions() {
    this.showPrescriptionsList = true;
  }

  onSelectPrescription(prescription: any) {
    this.selectedPrescription = prescription;
    this.showPrescriptionsList = false;  // Hide the list of prescriptions when one is selected
  }
  handleBackToList() {
    this.selectedPrescription = null;
    this.showPrescriptionsList = true;

  }

  backToPatientInfo() {
    this.showPrescriptionsList = false;
    this.selectedPrescription = null;
  }

  // Afficher la liste des soins infirmiers
onViewNursingCareList() {
  this.showNursingCareList = true; // Montre la liste des soins infirmiers
  this.selectedNursingCare = null; // Réinitialise le soin sélectionné
}

// Sélectionner un soin infirmier
selectNursingCare(nursingCare: any) {
  console.log('Soin infirmier sélectionné:', nursingCare);

  if (!nursingCare) {
    // Si aucun soin n'est sélectionné, affiche la liste des soins infirmiers
    this.showNursingCareList = true;
    this.selectedNursingCare = null;
  } else {
    // Si un soin est sélectionné, masque la liste et affiche les détails
    this.selectedNursingCare = nursingCare;
    this.showNursingCareList = false;
  }
}

// Retour à la liste des soins infirmiers
backToNursingCareList() {
  this.selectedNursingCare = null; // Réinitialise le soin sélectionné
  this.showNursingCareList = true; // Réaffiche la liste des soins
}

// Retour aux informations du patient depuis les soins infirmiers
backToPatientInfoNursing() {
  this.showNursingCareList = false; // Cache la liste des soins
  this.selectedNursingCare = null; // Réinitialise le soin sélectionné
}

 

}
