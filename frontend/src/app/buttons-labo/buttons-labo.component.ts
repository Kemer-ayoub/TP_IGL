import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-buttons-labo',
  imports: [],
  templateUrl: './buttons-labo.component.html',
  styleUrl: './buttons-labo.component.css'
})
export class ButtonsLaboComponent {
 @Output() viewCares = new EventEmitter<void>();
    @Output() Nursing = new EventEmitter<void>();
    onViewCares() {
this.viewCares.emit(); // emit to tell the parent about the changing on viewcares 
}
AddCare() {
this.Nursing.emit();
}
}
