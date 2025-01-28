import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button-radiologue',
  imports: [],
  templateUrl: './button-radiologue.component.html',
  styleUrl: './button-radiologue.component.css'
})
export class ButtonRadiologueComponent {
 @Output() viewCares = new EventEmitter<void>();
    @Output() Nursing = new EventEmitter<void>();
    onViewCares() {
this.viewCares.emit(); // emit to tell the parent about the changing on viewcares 
}
AddCare() {
this.Nursing.emit();
}
}
