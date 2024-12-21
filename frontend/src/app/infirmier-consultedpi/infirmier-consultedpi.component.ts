import { Component ,OnInit} from '@angular/core';
import { CardConsultedpiComponent } from "../card-consultedpi/card-consultedpi.component";
import { HeaderNavbarComponent } from "../header-navbar/header-navbar.component";
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { MockInfirmierService } from '../services/mock-infirmier.service';

@Component({
  selector: 'app-infirmier-consultedpi',
  imports: [CardConsultedpiComponent, HeaderNavbarComponent],
  templateUrl: './infirmier-consultedpi.component.html',
  styleUrl: './infirmier-consultedpi.component.css'
})
export class InfirmierConsultedpiComponent implements OnInit {
  infirmier:any;
  constructor(private mockInfirmierService: MockInfirmierService) {}

  ngOnInit(): void { // get the data from the service
    this.mockInfirmierService.getInfirmierData().subscribe((data) => {
      this.infirmier = data;
    });
  }
}
