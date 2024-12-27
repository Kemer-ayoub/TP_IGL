import { Routes , RouterModule , RouterLink } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NewUserComponent } from './new-user/new-user.component';
import { CreateDPIComponent } from './create-dpi/create-dpi.component';
import { PatientComponent } from './patient/patient.component';
import { PharmacienComponent } from './pharmacien/pharmacien.component';
import { InfirmierComponent } from './infirmier/infirmier.component';
import { RadiologueComponent } from './radiologue/radiologue.component';
import { MedecinConsulterDpiComponent } from './medecin-consulter-dpi/medecin-consulter-dpi.component';
import { MedecinAddNewConsultationComponent } from './medecin-add-new-consultation/medecin-add-new-consultation.component';
import { MedecinAddNewPrescriptionComponent } from './medecin-add-new-prescription/medecin-add-new-prescription.component';


export const routes: Routes = [
    { path: '', redirectTo: '/medecin', pathMatch: 'full' }, // Redirect root to /home
    { path: 'home', component: HomePageComponent }, // Home route
    { path: 'login', component: LoginScreenComponent},
    {path:'user', component:NewUserComponent} , 
    {path:'createDPI' , component:CreateDPIComponent} ,
    {path:'patient',component:PatientComponent},
    {path:'pharmacien',component:PharmacienComponent},
    {path:'infirmier',component:InfirmierComponent},
    {path: 'medecin', component: MedecinConsulterDpiComponent },
    {path:'radiologue',component:RadiologueComponent},
    { path: 'add-consultation',component: MedecinAddNewConsultationComponent },
  { path: 'add-prescription', component: MedecinAddNewPrescriptionComponent },
];
