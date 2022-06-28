import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  addEmpURL : string;
  getEmpURL : string;
  //postEmpURL : string;
  updateEmpUrl : string;
  deleteEmpUrl : string;

  constructor( private http: HttpClient) { 
    this.addEmpURL = 'http://localhost:8070/user-service/emp/addEmployee';
    this.getEmpURL = 'http://localhost:8070/user-service/emp/getAll';
    //this.postEmpURL = 'http://localhost:4200/postEmployee';
    this.updateEmpUrl = 'http://localhost:8070/user-service/emp/updateEmployee';
    this.deleteEmpUrl = 'http://localhost:8070/user-service/emp/deleteEmployeeById';
  }

  addEmployee(emp : Employee): Observable<Employee> {
    return this.http.post<Employee>(this.addEmpURL,emp);
  }

  /*postEmployee(data: any){
    return this.http.post<EmployeeModel>(this.addEmpURL,data);
  }*/
  

  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.getEmpURL);
  }

  updateEmployee(emp: Employee): Observable <Employee>{
    return this.http.put<Employee>(this.updateEmpUrl, emp);
  }

  deleteEmployee(emp: Employee): Observable <Employee>{
    return this.http.delete<Employee>(this.deleteEmpUrl+'/'+emp.id);
   }
  }

