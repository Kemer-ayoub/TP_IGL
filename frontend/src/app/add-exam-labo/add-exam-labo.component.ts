import { Component,AfterViewInit, Input, inject } from '@angular/core';
import Chart from 'chart.js/auto';
import { AuthService } from '../auth.service';
import { BilanbiologiqueService } from '../bilanbiologique.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-exam-labo',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-exam-labo.component.html',
  styleUrl: './add-exam-labo.component.css'
})
export class AddExamLaboComponent implements AfterViewInit{
  @Input() dpiId!: any;

  previousResults: number[] = [50, 100, 80];
  newResult: number =0;
  chart: any;
  date: string = '';
    time: string = '';
    typecare: string = '';
    description: string = '';
    observation: string = '';
    name: string = '';
    data: any = null;
    thedoctor: any;
    errorMessage: string = '';
    user: any;
    value1: number = -1;
    value2: number = -1;
    value3: number = -1;
  
    authService = inject(AuthService);
    bilanbiologiqueService = inject(BilanbiologiqueService);

  addBilanBiologique() {
   console.log("its the first noght,formData lalalalalalalal isaggggggiiiiiiiiiii")
    if (!this.date || (this.value1>=0 && this.value2>=0 && this.value3>=0) || !this.typecare || !this.observation) {
      return; // If any field is empty, don't proceed
    }
    
    this.authService.getCurrentAuthUser().subscribe((r) => {
      console.log(r);
      this.user = r;
      const formData = new FormData();
      
      // Append other fields
      formData.append('laborantin', this.user.id);
      formData.append('date', this.date);
      if (this.value1>=0) formData.append('value1', this.value1.toString());
      else formData.append('value1', 'null');
      if (this.value2>=0) formData.append('value2', this.value2.toString());
      else formData.append('value2', 'null');
      if (this.value3>=0) formData.append('value3', this.value3.toString());
      else formData.append('value3', 'null');
      formData.append('observation', this.observation);
      formData.append('dpi', this.dpiId);
      formData.append('type_bb', this.typecare);
      console.log("its the last noght,formData",formData)
      this.data = {
        "radiologue": this.user.id,
        "dpi": this.dpiId,
        "date": this.date,
        "time": this.time,
        "type_br": this.typecare,
        "description": this.description,
        "observations": this.observation,
      }

      console.log("that's where i follow", formData)
      // Handle the form submission here
      this.bilanbiologiqueService.addBilanBiologique(formData).subscribe({
        next: (response) => {
          console.log("the badi",response)
        },
        error: (error) => console.error('Error fetching DPI:', error)
      })
    });

  }
  
AddGraph() {
  const chartElement = document.getElementById('myChart');
    if (chartElement){
    
        const textarea = document.getElementById('description-input2') as HTMLTextAreaElement;
        const newResultValue = parseInt(textarea.value, 10); // Parse as base 10 integer
        
        if (!isNaN(newResultValue)) {
          this.newResult = newResultValue; // Only assign if it's a valid number
        }
        this.chart.data.datasets = [
          {
            label: 'Previous Results',
            data: this.previousResults, // Reset to the original array
            backgroundColor: '#558A8D',
            borderColor: '#558A8D',
            borderWidth: 1
          }
        ];
        this.addResult();

    

    }
  };


 
  
  ngAfterViewInit(): void {
    this.initializeChart();
    throw new Error('Method not implemented.');
  }

  initializeChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [50, 100, 150, 200,250], 
        datasets: [
          {
            label: 'Previous Results',
            data: this.previousResults,
         
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
  addResult() {
    if (this.newResult && this.newResult>0) {
      this.chart.data.datasets.push({
        label: 'NEW Results',
        data: [...this.previousResults, this.newResult],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      });
      this.chart.update();
    } else {
      alert('Please enter a result before adding to the graph.');
    }
 
    
  }


}