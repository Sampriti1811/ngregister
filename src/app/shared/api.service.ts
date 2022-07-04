import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  url= "http://localhost:3000/employees";
  //updateUrl !: string;

  constructor( 
    private http: HttpClient   
    ) { 
      //this.updateUrl = "http://localhost:3000/employees/";
  }
  users(){
    return this.http.get(this.url);
  }
  saveUsers(data:any){
    return this.http.post(this.url,data)
  }
  deleteEmployee (id:any){
    //console.log(j);
    return this.http.delete('http://localhost:3000/employees/'+id).pipe(map((res) =>
    {
      return res;
    }));

  }
  updateEmployee(emp:Employee){
    return this.http.put('http://localhost:3000/employees/{id}',emp);

}
} 