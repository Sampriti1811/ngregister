import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginsuccessComponent } from './loginsuccess/loginsuccess.component';
import { RegistrationComponent } from './registration/registration.component';
import { NgStyle } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { EmployeesComponent } from './employees/employees.component';
import { AddempComponent } from './app/addemp/addemp.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'loginsuccess', component:LoginsuccessComponent},
  {path: 'registration', component:RegistrationComponent},
  {path: 'login', component:LoginComponent},
  {path: 'employeelist', component:EmployeesComponent},
  {path: 'addemployee', component:AddempComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
