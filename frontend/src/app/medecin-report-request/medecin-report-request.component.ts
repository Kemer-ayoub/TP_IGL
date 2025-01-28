import { Component,EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { ReportrequestService } from '../reportrequest.service';

@Component({
  selector: 'app-medecin-report-request',
  imports: [FormsModule],
  templateUrl: './medecin-report-request.component.html',
  styleUrl: './medecin-report-request.component.css'
})
export class MedecinReportRequestComponent {
  Typeofimaging: string = '';  // Default value for priority
  bodypart: string = '';
  priority: string = 'standard';
  reasonrequest: string = '';
  testdate: string = '';
  doctorname: string = '';
  data: any = null;
  thedoctor: any;
  errorMessage: string = '';
  user: any;

  @Output() toggleReportRequest= new EventEmitter<void>();

  reportrequestService = inject(ReportrequestService);
  authService = inject(AuthService);
  
  constructor(private router: Router) {}
    cancel() {
      this.toggleReportRequest.emit();
  }

  addReportRequest() {

    if (!this.priority || !this.Typeofimaging || !this.bodypart || !this.reasonrequest || !this.testdate || !this.doctorname) {
      return; // If any field is empty, don't proceed
    }
    this.authService.getUserByUsername(this.doctorname).subscribe({
      next: (response: any) => {
        this.thedoctor = response
        this.authService.getCurrentAuthUser().subscribe((r) => {
          console.log(r);
          this.user = r;
          console.log("the doctor", this.thedoctor)
          console.log("the user", this.user)
          this.data = {
            "type_test": this.Typeofimaging,
            "body_part": this.bodypart,
            "priority": this.priority,
            "reason_req": this.reasonrequest,
            "req_date": this.testdate,
            "medecin": this.user.id,
            "radiologue": this.thedoctor.id
          }
          console.log("that's where i follow", this.data)
          // Handle the form submission here
          this.reportrequestService.addReportReq(this.data).subscribe({
            next: (response) => {
              console.log("nobody promised tommorow",response)
            },
            error: (error) => console.error('Error fetching DPI:', error)
          });
        });
      },
      error: (error) => {
        this.errorMessage = 'Failed to get user. Please try again.';}
    });
    
    
  }

}
