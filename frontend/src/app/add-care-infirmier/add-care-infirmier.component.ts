import { Component,CUSTOM_ELEMENTS_SCHEMA,EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { SoinService } from '../soin.service';

@Component({
  selector: 'app-add-care-infirmier',
  standalone: true,  // Si votre composant est autonome
  imports: [FormsModule],
  templateUrl: './add-care-infirmier.component.html',
  styleUrl: './add-care-infirmier.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AddCareInfirmierComponent {
  @Input() dpiId!: number;
  date: string = '';
  time: string = '';
  typecare: string = '';
  description: string = '';
  observation: string = '';
  data: any = null;
  thedoctor: any;
  errorMessage: string = '';
  user: any;

  authService = inject(AuthService);
  soinService = inject(SoinService);
  

  addSoin() {

    if (!this.date || !this.time || !this.typecare || !this.description || !this.observation) {
      return; // If any field is empty, don't proceed
    }
    this.authService.getCurrentAuthUser().subscribe((r) => {
      console.log(r);
      this.user = r;
      this.data = {
        "infirmier": this.user.id,
        "dpi": this.dpiId,
        "date": this.date,
        "time": this.time,
        "type_soin": this.typecare,
        "description_soin": this.description,
        "observations": this.observation
      }
  
      console.log("that's where i follow", this.data)
      // Handle the form submission here
      this.soinService.addSoin(this.data).subscribe({
        next: (response) => {
          console.log("the badi",response)
        },
        error: (error) => console.error('Error fetching DPI:', error)
      })
    });

  }

}
