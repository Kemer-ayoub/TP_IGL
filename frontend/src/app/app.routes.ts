import { Routes } from '@angular/router';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NewUserComponent } from './new-user/new-user.component';
import { CreateDPIComponent } from './create-dpi/create-dpi.component';
import { PatientComponent } from './patient/patient.component';
import { PharmacienComponent } from './pharmacien/pharmacien.component';
import { InfirmierComponent } from './infirmier/infirmier.component';
import { RadiologueComponent } from './radiologue/radiologue.component';
import { LaborantinComponent } from './laborantin/laborantin.component';
import { authGuard } from './auth.guard';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect root to /home
    { path: 'home', component: HomePageComponent }, // Home route
    { path: 'login', component: LoginScreenComponent},
    {path:'user', component:NewUserComponent, canActivate: [authGuard]}, 
    {path:'createDPI' , component:CreateDPIComponent},
    {path:'patient',component:PatientComponent},
    {path:'pharmacien',component:PharmacienComponent},
    {path:'infirmier',component:InfirmierComponent},
    {path:'radiologue',component:RadiologueComponent},
    {path:'laborantin',component:LaborantinComponent},
];
