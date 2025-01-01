import { HeaderComponent } from "../header/header.component";
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PatientInfoComponent } from "../patient-info/patient-info.component";
import { ButtonsPatientComponent } from "../buttons-patient/buttons-patient.component";
import { PatientInfoInfirmierComponent } from "../patient-info-infirmier/patient-info-infirmier.component";
import { ButtonPatientInfirmierComponent } from "../button-patient-infirmier/button-patient-infirmier.component";
import { CareListInfirmierComponent } from "../care-list-infirmier/care-list-infirmier.component";
import { CareDetailInfirmierComponent } from "../care-detail-infirmier/care-detail-infirmier.component";
import { AddCareInfirmierComponent } from "../add-care-infirmier/add-care-infirmier.component";
import { Component,HostListener, inject, OnInit  } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DpiService } from '../dpi.service';

@Component({
  selector: 'app-infirmier',
  imports: [HeaderComponent, SearchBarComponent, PatientInfoInfirmierComponent, PatientInfoComponent, ButtonPatientInfirmierComponent, CareListInfirmierComponent, CareDetailInfirmierComponent, CommonModule, AddCareInfirmierComponent],
  templateUrl: './infirmier.component.html',
  styleUrl: './infirmier.component.css'
})
export class InfirmierComponent {
  authService = inject(AuthService);
  dpiService = inject(DpiService);
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
      firstName: 'Oussama',
      lastName: 'Benhebbadj',
      address: 'Algiers',
      phoneNumber: '0796201008',
      dob: '23/07/2003',
      emergencyContact: '0662890634',
      carePhysician: 'doctorX',
      previousCares: [
        {name:'Care 1',
           date: '22/10/2024',
          type:'bandage',
          description:'..........',
          observations:'xxxxxxxx',
        },
        {name:'Care 2',
           date: '22/10/2023',
          type:'bandage',
          description:'..........',
          observations:'xxxxxxxx',
        },
        {name:'Care 3',
           date: '22/10/2024',
          type:'bage',
          description:'..........',
          observations:'xxxx654xxxx',
        }]}
      ,
        
    {
      nss: '22222',
      firstName: 'John',
      lastName: 'Doe',
      address: 'Oran',
      phoneNumber: '0777333444',
      dob: '15/09/1990',
      emergencyContact: '0668333777',
      carePhysician: 'doctorY',
      previousCares: [
        {name:'Care 1',
           date: '22/10/2024',
          type:'bandage',
          description:'..........',
          observations:'xxxxxxxx',
        },
        {name:'Care 2',
           date: '22/10/2023',
          type:'bandage',
          description:'..........',
          observations:'xxxxxxxx',
        },
        {name:'Care 3',
           date: '22/10/2024',
          type:'bage',
          description:'..........',
          observations:'xxxx654xxxx',
        }]
    },
    {
      nss: '33333',
      firstName: 'Jane',
      lastName: 'Smith',
      address: 'Tlemcen',
      phoneNumber: '0798123456',
      dob: '02/11/1985',
      emergencyContact: '0669123456',
      carePhysician: 'doctorZ',
    previousCares: [
        {name:'Care 1',
           date: '22/10/2024',
          type:'bandage',
          description:'..........',
          observations:'xxxxxxxx',
        },
        {name:'Care 2',
           date: '22/10/2023',
          type:'bandage',
          description:'..........',
          observations:'xxxxxxxx',
        },
        {name:'Care 3',
           date: '22/10/2024',
          type:'bage',
          description:'..........',
          observations:'xxxx654xxxx',
        }]
    }
  ];

  nss: string = '';
  patient: any = null;
  errorMessage: string='';
  selectedCare: any = null;
  showCaresList: boolean = false;
  showNursing: boolean = false;
  searchPatient() {
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
