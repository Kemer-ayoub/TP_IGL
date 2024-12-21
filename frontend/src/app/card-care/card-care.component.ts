import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-care',
  imports: [],
  templateUrl: './card-care.component.html',
  styleUrl: './card-care.component.css'
})
export class CardCareComponent implements OnInit {
  careDetails: any;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        this.careDetails = JSON.parse(params['data']); // Parse the care object
    // this.careDetails=params['data'];
        console.log('Care Details:', this.careDetails);
      }
    });
  }

}
