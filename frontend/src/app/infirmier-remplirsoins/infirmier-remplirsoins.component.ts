import { Component } from '@angular/core';
import { HeaderNavbarComponent } from "../header-navbar/header-navbar.component";
import { CardAddnewcareComponent } from "../card-addnewcare/card-addnewcare.component";

@Component({
  selector: 'app-infirmier-remplirsoins',
  imports: [HeaderNavbarComponent, CardAddnewcareComponent],
  templateUrl: './infirmier-remplirsoins.component.html',
  styleUrl: './infirmier-remplirsoins.component.css'
})
export class InfirmierRemplirsoinsComponent {

}
