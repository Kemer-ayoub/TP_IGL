import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-consultedpi',
  imports: [],
  templateUrl: './card-consultedpi.component.html',
  styleUrl: './card-consultedpi.component.css'
})
//use the @Input() decorator to declare a variable in the child component that will receive the data from the parent.
export class CardConsultedpiComponent {

  constructor(private router: Router) {}

  @Input() infirmier: any;
  navigatetoAdd() {
    this.router.navigate(['addcare'])
  }
  navigaetToList(){
    const caresString = JSON.stringify(this.infirmier.previousCares);
    this.router.navigate(['cares'], {
      queryParams: { previousCares: caresString }
    });
  }
}

