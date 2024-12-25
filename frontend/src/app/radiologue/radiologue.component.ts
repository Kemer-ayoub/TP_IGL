import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { ButtonRadiologueComponent } from "../button-radiologue/button-radiologue.component";
import { PatientInfoInfirmierComponent } from "../patient-info-infirmier/patient-info-infirmier.component";
import { ReportListRadiologueComponent } from "../report-list-radiologue/report-list-radiologue.component";
import { ReportDetailRadiologueComponent } from "../report-detail-radiologue/report-detail-radiologue.component";
import { AddReportRadiologueComponent } from "../add-report-radiologue/add-report-radiologue.component";
@Component({
  selector: 'app-radiologue',
  imports: [CommonModule, HeaderComponent, SearchBarComponent, ButtonRadiologueComponent, PatientInfoInfirmierComponent, ReportListRadiologueComponent, ReportDetailRadiologueComponent, AddReportRadiologueComponent],
  templateUrl: './radiologue.component.html',
  styleUrl: './radiologue.component.css'
})
export class RadiologueComponent {
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
      previousCares: [
        {dname:'doctorX',
           date: '22/10/2024',
          type:'X-Ray',
          body_part:'Left Knee',
          reason:' Suspected fracture due to a recent injury (fall from stairs)',
          priority:'Urgent',
        },
        {dname:' doctorX',
           date: '22/10/2023',
          type:'bandage',
          body_part:'..........',
          reason:'xxxxxxxx',
          priority:'Urgent',
        },
        {dname:'Care 3',
           date: '22/10/2024',
          type:'bage',
          body_part:'..........',
          reason:'xxxx654xxxx',
          priority:'Urgent',
        }]}
      ,
        
    {
      ssn: '22222',
      firstName: 'John',
      lastName: 'Doe',
      address: 'Oran',
      phoneNumber: '0777333444',
      dob: '15/09/1990',
      emergencyContact: '0668333777',
      carePhysician: 'doctorY',
      previousCares: [
        {dname:'Care 1',
           date: '22/10/2024',
          type:'bandage',
          body_part:'..........',
          reason:'xxxxxxxx',
          priority:'Urgent'
        },
        {dname:'Care 2',
           date: '22/10/2023',
          type:'bandage',
          body_part:'..........',
          reason:'xxxxxxxx',
          priority:'Urgent'
        },
        {dname:'Care 3',
           date: '22/10/2024',
          type:'bage',
          body_part:'..........',
          reason:'xxxx654xxxx',
          priority:'Urgent'
        }]
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
    previousCares: [
        {dname:'Care 1',
           date: '22/10/2024',
          type:'bandage',
          body_part:'..........',
          reason:'xxxxxxxx',
          priority:'Urgent'
        },
        {dname:'Care 2',
           date: '22/10/2023',
          type:'bandage',
          body_part:'..........',
          reason:'xxxxxxxx',
          priority:'Urgent'
        },
        {dname:'Care 3',
           date: '22/10/2024',
          type:'bage',
          body_part:'..........',
          reason:'xxxx654xxxx',
          priority:'Urgent'
        }]
    }
  ];

  ssn: string = '';
  patient: any = null;
  errorMessage: string='';
  selectedCare: any = null;
  showCaresList: boolean = false;
  showNursing: boolean = false;
  searchPatient() {
    this.errorMessage = '';
    this.patient = this.patients.find(patient => patient.ssn === this.ssn);
    if (!this.patient) {
      this.errorMessage = 'Patient not found!';
    }
  }
  onSSNEntered(ssn: string) {
    this.ssn=ssn; 
    this.searchPatient();
    }
 
  onViewCares() {
    console.log("the view get called")
    this.showCaresList = true;  
  }
  AddCare() {
    this.showNursing = true; // Montre la liste des soins infirmiers
  }
  selectConsultation(care: any) {
    if (!care) {
      // Si aucune consultation n'est sélectionnée, affiche la liste des consultations
      this.showCaresList = true;
      this.selectedCare = null;
    } else {
      // Si une consultation est sélectionnée, masque la liste et affiche les détails
      this.selectedCare = care;
      this.showCaresList = false;
    }
  }
  backToPatientInfoConsultation() {
    this.showCaresList = false;
    this.selectedCare = null;
  }
  backToConsultationList() {
    this.selectedCare = null;
    this.showCaresList = true;
  }
}
