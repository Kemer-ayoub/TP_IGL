import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-care-detail-infirmier',
  imports: [CommonModule],
  templateUrl: './care-detail-infirmier.component.html',
  styleUrl: './care-detail-infirmier.component.css'
})
export class CareDetailInfirmierComponent {
  @Input() selectedCare: any;
  @Output() backToConsultationList: EventEmitter<void> = new EventEmitter();
  onBackToConsultationList() {
    this.backToConsultationList.emit();
  }
}
