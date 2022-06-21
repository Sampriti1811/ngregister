import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RegistrationService } from '../registration.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User();
  msg='';
  constructor(private _service : RegistrationService, private _router : Router,private authService:AuthService) { }

  ngOnInit(): void {
  }

  loginUser(loginform: { value: any; }){
    console.log(loginform.value);

    this._service.loginUserFromRemote(this.user).subscribe(
      data => {
        console.log("response received");
        this._router.navigate(['/employeelist']) 
      },
      error => {
        console.log("exception occured");
        this.msg = "Bad credentials, please enter valid name and password";
    }
    )

  }
  
  
}
