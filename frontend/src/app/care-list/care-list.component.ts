import { Component, OnInit } from '@angular/core';
import { InfirmierSoinsprecedentComponent } from '../infirmier-soinsprecedent/infirmier-soinsprecedent.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-care-list',
  imports: [CommonModule],
  templateUrl: './care-list.component.html',
  styleUrl: './care-list.component.css'
})
export class CareListComponent implements OnInit {
  careList: any[] = [{}];

  constructor(private careService: InfirmierSoinsprecedentComponent,private router: Router) {}

  ngOnInit() {
    this.careList = this.careService.getCareList();
  }
  navigateToDetails(care:any){
    this.router.navigate(['details'], {
      queryParams: { data: JSON.stringify(care) }
    });
  }
}