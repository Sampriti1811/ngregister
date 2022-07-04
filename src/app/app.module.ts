import { HttpClient, HttpClientModule} from '@angular/common/http';
import { NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgStyle } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginsuccessComponent } from './loginsuccess/loginsuccess.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth.service';
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import { ConfirmationPopoverModule} from 'angular-confirmation-popover';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddempComponent } from './app/addemp/addemp.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    LoginsuccessComponent,
    AuthComponent,
    EmployeesComponent,
    HomeComponent,
    AddempComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
