import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { User } from '../user';
import { interval } from 'rxjs';
import { timestamp } from 'rxjs/operators';

@Component({
  selector: 'app-loginsuccess',
  templateUrl: './loginsuccess.component.html',
  styleUrls: ['./loginsuccess.component.css']
})
export class LoginsuccessComponent implements OnInit {

  user = new User();
  msg='';

  now: string | undefined;

  constructor(private _service : RegistrationService, private _router : Router) { 
    setInterval(() => {
      this.now = new Date().toString().split(' ')[4];
    }, 1);
  }

  ngOnInit(): void {
    const source$ = interval(1000);

    source$.pipe(timestamp()).subscribe(value => {
      console.log(value);
    });
  }

  gotologout(){
    this._router.navigate(['/login'])
  }

}
