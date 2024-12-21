import { Component } from '@angular/core';
import { HeaderNavbarComponent } from "../header-navbar/header-navbar.component";
import { CardCareComponent } from "../card-care/card-care.component";

@Component({
  selector: 'app-infirmier-soindetail',
  imports: [HeaderNavbarComponent, CardCareComponent],
  templateUrl: './infirmier-soindetail.component.html',
  styleUrl: './infirmier-soindetail.component.css'
})
export class InfirmierSoindetailComponent {

}
