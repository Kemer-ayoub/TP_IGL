import { Component,CUSTOM_ELEMENTS_SCHEMA,EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { SoinService } from '../soin.service';
import { BilanradiologiqueService } from '../bilanradiologique.service';

@Component({
  selector: 'app-add-report-radiologue',
  imports: [FormsModule],
  templateUrl: './add-report-radiologue.component.html',
  styleUrl: './add-report-radiologue.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AddReportRadiologueComponent {
  @Input() dpiId!: any;
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
  bilanradiologiqueService = inject(BilanradiologiqueService);

  selectedFileName: File | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFileName = input.files[0];
    }
  }

  addBilanRadiologique() {

    if (!this.date || !this.time || !this.typecare || !this.description || !this.observation || !this.selectedFileName) {
      return; // If any field is empty, don't proceed
    }

    this.authService.getCurrentAuthUser().subscribe((r) => {
      console.log(r);
      this.user = r;
      const formData = new FormData();
      
      // Append other fields
      formData.append('radiologue', this.user.id);
      formData.append('dpi', this.dpiId);
      formData.append('date', this.date);
      formData.append('time', this.time);
      formData.append('type_br', this.typecare);
      formData.append('description', this.description);
      formData.append('observations', this.observation);
      if(this.selectedFileName){
        formData.append('image', this.selectedFileName);
        console.log("its the first noght,formData lalalalalalalal",formData)
        // Inspect FormData entries
        for (const [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }
      }
      console.log("its the last noght,formData",formData)
      this.data = {
        "radiologue": this.user.id,
        "dpi": this.dpiId,
        "date": this.date,
        "time": this.time,
        "type_br": this.typecare,
        "description": this.description,
        "observations": this.observation,
        "image": formData
      }

      console.log("that's where i follow", formData)
      // Handle the form submission here
      this.bilanradiologiqueService.addBilanRadiologique(formData).subscribe({
        next: (response) => {
          console.log("the badi",response)
        },
        error: (error) => console.error('Error fetching DPI:', error)
      })
    });

  }

}
