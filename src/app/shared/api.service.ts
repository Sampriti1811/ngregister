import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl= "http://localhost:3000/employees/";
  //updateUrl !: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient
    ) {
      //this.updateUrl = "http://localhost:3000/employees/";
  }
  users(){
    return this.http.get(this.baseurl);
  }
  saveUsers(data:any){
    return this.http.post(this.baseurl,data)
  }
  deleteEmployee (id:any){
    //console.log(j);
    return this.http.delete(this.baseurl+id).pipe(map((res) =>
    {
      return res;
    }));

  }
  updateEmployee(emp:Employee, id:any){
    return this.http.put(this.baseurl+id, JSON.stringify(emp), this.httpOptions);
}
}
