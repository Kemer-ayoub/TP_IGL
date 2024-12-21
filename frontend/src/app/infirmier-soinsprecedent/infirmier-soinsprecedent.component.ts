import { Component, OnInit } from '@angular/core';
import { HeaderNavbarComponent } from "../header-navbar/header-navbar.component";
import { CareListComponent } from "../care-list/care-list.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-infirmier-soinsprecedent',
  imports: [HeaderNavbarComponent, CareListComponent],
  templateUrl: './infirmier-soinsprecedent.component.html',
  styleUrl: './infirmier-soinsprecedent.component.css'
})
export class InfirmierSoinsprecedentComponent implements OnInit {
 
  careList: any; // Declare careList as a class property
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['previousCares']) {
        this.careList = JSON.parse(params['previousCares']); // Parse the string back into an object
      }
    });
  }
 
  getCareList() {
    return this.careList;
  }
}
