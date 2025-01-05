import { Component,AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-add-exam-labo',
  imports: [],
  templateUrl: './add-exam-labo.component.html',
  styleUrl: './add-exam-labo.component.css'
})
export class AddExamLaboComponent implements AfterViewInit{

  previousResults: number[] = [50, 100, 80];
  newResult: number =0;
  chart: any;

  
AddGraph() {
  const chartElement = document.getElementById('myChart');
    if (chartElement){
    chartElement.style.display = (chartElement.style.display === 'none' || chartElement.style.display === '') ? 'block' : 'none';
    
    // Optionally, initialize or update your chart when it's made visible
    if (chartElement.style.display === 'block') {
      this.newResult=0; 
      const textarea = document.getElementById('description-input2') as HTMLTextAreaElement;
      const newResultValue = parseInt(textarea.value, 10); // Parse as base 10 integer
      
      if (!isNaN(newResultValue)) {
        this.newResult = newResultValue; // Only assign if it's a valid number
      }
      this.addResult();
    this.initializeChart();  

    }}
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
