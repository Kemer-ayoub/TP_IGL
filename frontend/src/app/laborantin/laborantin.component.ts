<<<<<<< HEAD
=======
import { Component } from '@angular/core';
>>>>>>> 1109aeef4c2c5a93517dd75840f96155dc960e5b
import { HeaderComponent } from "../header/header.component";
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { PatientInfoInfirmierComponent } from "../patient-info-infirmier/patient-info-infirmier.component";
import { ButtonsLaboComponent } from "../buttons-labo/buttons-labo.component";
import { ExamsListLaboComponent } from "../exams-list-labo/exams-list-labo.component";
import { RequestDetailLaboComponent } from "../request-detail-labo/request-detail-labo.component";
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { ButtonRadiologueComponent } from "../button-radiologue/button-radiologue.component";
import { ReportListRadiologueComponent } from "../report-list-radiologue/report-list-radiologue.component";
import { ReportDetailRadiologueComponent } from "../report-detail-radiologue/report-detail-radiologue.component";
import { AddReportRadiologueComponent } from "../add-report-radiologue/add-report-radiologue.component";
import { Component,HostListener, inject, OnInit  } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DpiService } from '../dpi.service';
import { PatientInfoComponent } from '../patient-info/patient-info.component';
import { ExamrequestService } from "../examrequest.service";
@Component({
  selector: 'app-laborantin',
  imports: [HeaderComponent, SearchBarComponent, PatientInfoInfirmierComponent, PatientInfoComponent, ButtonsLaboComponent, ExamsListLaboComponent, RequestDetailLaboComponent,CommonModule],
=======
@Component({
  selector: 'app-laborantin',
  imports: [HeaderComponent, SearchBarComponent, PatientInfoInfirmierComponent, ButtonsLaboComponent, ExamsListLaboComponent, RequestDetailLaboComponent,CommonModule],
>>>>>>> 1109aeef4c2c5a93517dd75840f96155dc960e5b
  templateUrl: './laborantin.component.html',
  styleUrl: './laborantin.component.css'
})
export class LaborantinComponent {
<<<<<<< HEAD
  authService = inject(AuthService);
  dpiService = inject(DpiService);
  examrequestService = inject(ExamrequestService);
    
  user?: any;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly API_URL = 'http://127.0.0.1:8000/api/';
  private readonly REFRESH_URL = `${this.API_URL}token/refresh/`;
  private DPI_URL!: string;
  private http = inject(HttpClient);
  error: string | null = null;
  dpi: any = null;
  theid: any = null;

  patients = [
    {
     nss: '11111',
=======
  patients = [
    {
     ssn: '11111',
>>>>>>> 1109aeef4c2c5a93517dd75840f96155dc960e5b
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
<<<<<<< HEAD
      nss: '22222',
=======
      ssn: '22222',
>>>>>>> 1109aeef4c2c5a93517dd75840f96155dc960e5b
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
<<<<<<< HEAD
      nss: '33333',
=======
      ssn: '33333',
>>>>>>> 1109aeef4c2c5a93517dd75840f96155dc960e5b
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

<<<<<<< HEAD
  nss: string = '';
=======
  ssn: string = '';
>>>>>>> 1109aeef4c2c5a93517dd75840f96155dc960e5b
  patient: any = null;
  errorMessage: string='';
  selectedCare: any = null;
  showCaresList: boolean = false;
  showNursing: boolean = false;
  searchPatient() {
<<<<<<< HEAD
    this.fetchDpi(this.nss);
    if (!this.patient) {
    }
  }
  onnssEntered(nss: string) {
    this.nss = nss;
    this.searchPatient();
  }

  fetchDpi(nss: any) {
    this.dpiService.getDpi(nss).subscribe({
      next: (outerData) => {
        this.authService.getNom(outerData.medecin_traitant).subscribe({
          next: (innerData) => {
            outerData.medecin_traitant = innerData;
            this.patient = outerData
          },
          error: (error) => console.error('Error fetching DPI:', error)
        })
        // Add more lines of code here
    },
      error: (error) => console.error('Error fetching DPI:', error)
    });
  }

  getAllExamReq(){
    this.examrequestService.getAllExamReq().subscribe({
      next: (response) => {
        console.log("ah i love it and i hate it at the same time",response);
        this.patient.previousCares = response;
        /*this.patient.previousCares.forEach((element: any) => {
          console.log("apati apati",element)
          this.authService.getNom(element.medecin).subscribe({
            next: (innerData) => {
              element.medecin = innerData;
              
            },
            error: (error) => console.error('Error fetching medecin data:', error)
          });
        });*/
      },
      error: (error) => console.error('Error fetching DPI:', error)
    })
  }
 
  onViewCares() {
    console.log("the view get called")
    this.getAllExamReq();
=======
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
>>>>>>> 1109aeef4c2c5a93517dd75840f96155dc960e5b
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
