import { Routes } from '@angular/router';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NewUserComponent } from './new-user/new-user.component';
import { CreateDPIComponent } from './create-dpi/create-dpi.component';
import { PatientComponent } from './patient/patient.component';
import { PharmacienComponent } from './pharmacien/pharmacien.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect root to /home
    { path: 'home', component: HomePageComponent }, // Home route
    { path: 'login', component: LoginScreenComponent},
    {path:'user', component:NewUserComponent} , 
    {path:'createDPI' , component:CreateDPIComponent} ,
    {path:'patient',component:PatientComponent},
    {path:'pharmacien',component:PharmacienComponent},
    

];
