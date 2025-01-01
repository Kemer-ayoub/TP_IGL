import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-request-detail-labo',
  imports: [CommonModule],
  templateUrl: './request-detail-labo.component.html',
  styleUrl: './request-detail-labo.component.css'
})
export class RequestDetailLaboComponent {
  @Input() selectedCare: any;
  @Output() backToConsultationList: EventEmitter<void> = new EventEmitter();
  onBackToConsultationList() {
    this.backToConsultationList.emit();
  }
}
