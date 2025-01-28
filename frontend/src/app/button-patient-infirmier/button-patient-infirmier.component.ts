import { Component, EventEmitter, Output } from '@angular/core';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-button-patient-infirmier',
  imports: [],
  templateUrl: './button-patient-infirmier.component.html',
  styleUrl: './button-patient-infirmier.component.css'
})
export class ButtonPatientInfirmierComponent {
    @Output() viewCares = new EventEmitter<void>();
    @Output() Nursing = new EventEmitter<void>();
    onViewCares() {
this.viewCares.emit(); // emit to tell the parent about the changing on viewcares 
}
AddCare() {
this.Nursing.emit();
}
}
