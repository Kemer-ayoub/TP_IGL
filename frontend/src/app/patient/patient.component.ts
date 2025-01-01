import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { PatientInfoComponent } from '../patient-info/patient-info.component';
import { PrescriptionsListComponent } from '../prescriptions-list/prescriptions-list.component';
import { PrescriptionsDetailComponent } from '../prescriptions-detail/prescriptions-detail.component';
import { ConsultationListComponent } from '../consultation-list/consultation-list.component';
import { ConsultationDetailComponent } from '../consultation-detail/consultation-detail.component';
import { RouterLink } from '@angular/router';
import { ButtonsPatientComponent } from '../buttons-patient/buttons-patient.component';
import { NursingComponent } from '../nursing/nursing.component';
import { MedicalHistoryComponent } from '../medical-history/medical-history.component';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MedHistoryService } from '../medHistory.service';

@Component({
  selector: 'app-patient',
  imports: [
    FormsModule,
    MedicalHistoryComponent,
    NursingComponent,
    ButtonsPatientComponent,
    RouterLink,
    ConsultationDetailComponent,
    CommonModule,
    ConsultationListComponent,
    HeaderComponent,
    SearchBarComponent,
    PatientInfoComponent,
    PrescriptionsDetailComponent,
    PrescriptionsListComponent,
  ],
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  authService = inject(AuthService);
  medHistoryService = inject(MedHistoryService);
  private http = inject(HttpClient);

  user?: any;
  dpi: any = null;
  patient: any = null;
  error: string | null = null;
  errorMessage: string = '';
  ssn: string = '';

  // API endpoints
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly API_URL = 'http://127.0.0.1:8000/api/';
  private readonly REFRESH_URL = `${this.API_URL}token/refresh/`;
  private DPI_URL!: string;

  // UI State
  showPrescriptionsList = false;
  selectedPrescription: any = null;
  selectedConsultation: any = null;
  showConsultationsList = false;
  showNursingCareList = false;
  selectedNursingCare: any = null;
  showMedicalHistory = false;
  selectedNursingCareIndex: number | null = null;

  patients = [
    {
      ssn: '111',
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
          summary:
            'Routine check-up with Dr. Amina, prescriptions include Paracetamol and Ibuprofen.',
          prescriptions: [
            { name: 'Paracetamol', dose: '500mg', duration: '7 days' },
            { name: 'Ibuprofen', dose: '200mg', duration: '5 days' },
          ],
        },
      ],
      nursingCare: [
        {
          date: '2023-06-15',
          time: '10:00 AM',
          type: 'Wound Dressing',
          description: 'Dressing of a wound on the left arm.',
          observations: 'Healing well, no signs of infection.',
        },
      ],
      medicalHistory: {
        chronicIllnesses: [{ name: 'Diabetes', date: '2018-05-01' }],
        surgeries: [{ name: 'Appendectomy', date: '2015-07-20' }],
        allergies: [{ name: 'Penicillin', date: '2012-08-15' }],
        medications: [{ name: 'Metformin', date: '2023-06-01' }],
      },
    },
  ];

  constructor() {
    this.authService.getCurrentAuthUser().subscribe((user) => {
      this.user = user;
      this.DPI_URL = `${this.API_URL}dpi/${this.user.id}`;
      this.fetchDpi();
    });
  }

  ngOnInit(): void {
    this.updateHeight();
  }

  private fetchDpi() {
    try {
      const tokenData = JSON.parse(
        localStorage.getItem(this.JWT_TOKEN) || '{}',
      );
      const accessToken = tokenData.access;

      if (!accessToken) {
        throw new Error('Access token not found.');
      }

      const headers = new HttpHeaders({
        Authorization: `Bearer ${accessToken}`,
      });

      this.http
        .get(this.DPI_URL, { headers })
        .pipe(
          catchError((error) => {
            if (error.status === 401) {
              const refreshToken = tokenData.refresh;
              if (!refreshToken) {
                return throwError(() => new Error('Refresh token not found'));
              }

              return this.http
                .post<{
                  access: string;
                }>(this.REFRESH_URL, { refresh: refreshToken })
                .pipe(
                  switchMap((newTokens) => {
                    localStorage.setItem(
                      this.JWT_TOKEN,
                      JSON.stringify(newTokens),
                    );
                    return this.http.get(this.DPI_URL, {
                      headers: new HttpHeaders({
                        Authorization: `Bearer ${newTokens.access}`,
                      }),
                    });
                  }),
                  catchError(() => {
                    localStorage.removeItem(this.JWT_TOKEN);
                    return throwError(() => new Error('Token refresh failed'));
                  }),
                );
            }
            return throwError(
              () => new Error('Failed to fetch DPI information'),
            );
          }),
        )
        .subscribe({
          next: (response) => {
            this.dpi = response;
            this.ssn = this.dpi.ssn;
            this.authService.getNom(this.dpi.medecin_traitant).subscribe({
              next: (name) => (this.dpi.medecin_traitant = name),
              error: (err) => console.error('Error fetching doctor name:', err),
            });
          },
          error: (err) => (this.error = err.message),
        });
    } catch (err) {
      this.error =
        err instanceof Error ? err.message : 'An unknown error occurred';
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateHeight();
  }

  private updateHeight(): void {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  searchPatient() {
    this.errorMessage = '';
    this.patient = this.patients.find((p) => p.ssn === this.ssn);
    if (!this.patient) {
      this.errorMessage = 'Patient not found!';
    }
  }

  toggleMedicalHistory() {
    if (this.dpi) {
      this.medHistoryService.getAntecedants(this.dpi.id).subscribe({
        next: (history) => {
          const typeMapping: { [key: string]: string } = {
            allergie: 'allergies',
            vaccination: 'vaccination',
            medication: 'medications',
            'personal medical': 'chronicIllnesses',
          };

          const medicalHistory = history.reduce((acc: any, item: any) => {
            const type = typeMapping[item.type_record];
            if (type) {
              acc[type] = acc[type] || [];
              acc[type].push({ name: item.name_record, date: item.antec_date });
            }
            return acc;
          }, {});

          this.patient = {
            ...this.patient,
            medicalHistory: {
              chronicIllnesses: medicalHistory.chronicIllnesses || [],
              surgeries: medicalHistory.vaccination || [],
              allergies: medicalHistory.allergies || [],
              medications: medicalHistory.medications || [],
            },
          };

          this.showMedicalHistory = !this.showMedicalHistory;
        },
        error: (err) => console.error('Error fetching medical history:', err),
      });
    }
  }

  calculateAge(dob: string): number {
    const [day, month, year] = dob.split('/').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }
}
