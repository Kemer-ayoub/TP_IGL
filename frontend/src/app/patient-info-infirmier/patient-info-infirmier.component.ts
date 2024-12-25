import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-patient-info-infirmier',
  imports: [],
  templateUrl: './patient-info-infirmier.component.html',
  styleUrl: './patient-info-infirmier.component.css'
})
export class PatientInfoInfirmierComponent {

  @Input() patient: any;
}
