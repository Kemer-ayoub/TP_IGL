import { Component,EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medecin-report-request',
  imports: [],
  templateUrl: './medecin-report-request.component.html',
  styleUrl: './medecin-report-request.component.css'
})
export class MedecinReportRequestComponent {
  @Output() toggleReportRequest= new EventEmitter<void>();
  
    constructor(private router: Router) {}
    cancel() {
      this.toggleReportRequest.emit();
    }

}
