import { Component, EventEmitter, Input, Output,AfterViewInit } from '@angular/core';
import { PatientComponent } from '../patient/patient.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart  from 'chart.js/auto';
@Component({
  selector: 'app-exam-detail-patient',
  imports: [PatientComponent,CommonModule,FormsModule],
  templateUrl: './exam-detail-patient.component.html',
  styleUrl: './exam-detail-patient.component.css'
})
export class ExamDetailPatientComponent implements AfterViewInit {
  @Input() selectedConsultation: any;
  @Input() selectedPrescription: any;
  
  @Output() backToConsultationList: EventEmitter<void> = new EventEmitter();
  @Output() selectPrescription: EventEmitter<any> = new EventEmitter();
  

   Results: number[] = [50, 100, 80]; // this one has to be fetched 
   chart: any;

   ngAfterViewInit(): void {
    this.initializeChart();
    throw new Error('Method not implemented.');
  }


   initializeChart() {
    console.log(this.Results)
    console.log("it works")
      const ctx = document.getElementById('myChart') as HTMLCanvasElement;
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [50, 100, 150, 200,250], 
          datasets: [
            {
              label: 'Results',
              data: this.Results,
           
              backgroundColor: '#558A8D',
              borderColor: '#558A8D',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              ticks: {
                display: false // Hides labels on the X-axis
              },  grid: {
                drawTicks: false, // Removes tick marks
          
              }
            },
            y: {
              ticks: {
                stepSize: 50, // Specifies step size (50)
              },   
              min: 0, // Minimum value of the Y-axis
              max: 200, // Maximum value of the Y-axis
            }
          }
        }
      });
    }
 


download() {
// the work of integration
}

  // Method to go back to the consultation list
onBackToConsultationList() {
    this.backToConsultationList.emit();
}

  
}
