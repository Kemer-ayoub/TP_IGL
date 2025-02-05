import { Component,EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ExamrequestService } from '../examrequest.service';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-medecin-exam-request',
  imports: [FormsModule],
  templateUrl: './medecin-exam-request.component.html',
  styleUrl: './medecin-exam-request.component.css'
})
export class MedecinExamRequestComponent {
  priority: string = 'standard';  // Default value for priority
  medicalJustification: string = '';
  testDate: string = '';
  doctorName: string = '';
  Typeoftest: string = '';
  Subtypeoftest: string = '';
  data: any = null;
  thedoctor: any;
  errorMessage: string = '';
  user: any;

  @Output() toggleExamRequest= new EventEmitter<void>();

  examrequestService = inject(ExamrequestService);
  authService = inject(AuthService);


  constructor(private router: Router) {}
  cancel() {
    this.toggleExamRequest.emit();
  }

  addExamRequest() {

    if (!this.priority || !this.medicalJustification || !this.testDate || !this.doctorName || !this.Typeoftest || !this.Subtypeoftest) {
      return; // If any field is empty, don't proceed
    }
    this.authService.getUserByUsername(this.doctorName).subscribe({
      next: (response: any) => {
        this.thedoctor = response
        this.authService.getCurrentAuthUser().subscribe((r) => {
          console.log(r);
          this.user = r;
          this.data = {
            "type_test": this.Typeoftest,
            "subtype_test": this.Subtypeoftest,
            "priority": this.priority,
            "medical_just": this.medicalJustification,
            "req_date": this.testDate,
            "laborantin": this.thedoctor.id,
            "medecin": this.user.id
          }
      
            console.log("that's where i follow", this.data)
            // Handle the form submission here
            this.examrequestService.addExamReq(this.data).subscribe({
              next: (response) => {
                console.log("the badi",response)
              },
              error: (error) => console.error('Error fetching DPI:', error)
            })
        });
      },
      error: (error) => {
        this.errorMessage = 'Failed to get user. Please try again.';}
    });
    

  }

}
