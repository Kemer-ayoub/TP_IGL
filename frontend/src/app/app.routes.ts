import { Routes } from '@angular/router';
import { InfirmierConsultedpiComponent } from './infirmier-consultedpi/infirmier-consultedpi.component';
import { InfirmierRemplirsoinsComponent } from './infirmier-remplirsoins/infirmier-remplirsoins.component';
import { InfirmierSoindetailComponent } from './infirmier-soindetail/infirmier-soindetail.component';
import { InfirmierSoinsprecedentComponent } from './infirmier-soinsprecedent/infirmier-soinsprecedent.component';
import { CommonModule } from '@angular/common';
export const routes: Routes = [
    { path: '', component: InfirmierConsultedpiComponent },
    { path: 'cares', component: InfirmierSoinsprecedentComponent },
    { path: 'details', component: InfirmierSoindetailComponent },
    { path: 'addcare', component: InfirmierRemplirsoinsComponent },
];
