import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-report-detail-radiologue',
  imports: [CommonModule],
  templateUrl: './report-detail-radiologue.component.html',
  styleUrl: './report-detail-radiologue.component.css'
})
export class ReportDetailRadiologueComponent {
  @Input() selectedCare: any;
  @Output() backToConsultationList: EventEmitter<void> = new EventEmitter();
  onBackToConsultationList() {
    this.backToConsultationList.emit();
  }
}
