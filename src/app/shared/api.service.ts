import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { map } from 'rxjs/operators';
import { EmployeeModel } from '../employee-dashboard/employee-dashboard.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  addEmpURL :string;
  getEmpURL : string;
  postEmpURL : string;
  updateEmpUrl : string;
  deleteEmpUrl : string;

  constructor( private http: HttpClient) { 
    this.addEmpURL = 'http://localhost:4200/addEmployee';
    this.getEmpURL = 'http://localhost:4200/getAll';
    this.postEmpURL = 'http://localhost:4200/postEmployee';
    this.updateEmpUrl = 'http://localhost:4200/updateEmployee';
    this.deleteEmpUrl = 'http://localhost:4200/deleteEmployeeById';
  }

  addEmployee(emp : EmployeeModel): Observable<EmployeeModel> {
    return this.http.post<EmployeeModel>(this.addEmpURL,emp);
  }

  /*postEmployee(data: any){
    return this.http.post<EmployeeModel>(this.addEmpURL,data);
  }*/
  

  getEmployee(){
    return this.http.get<EmployeeModel[]>(this.getEmpURL);
  }

  updateEmployee(emp: EmployeeModel): Observable <EmployeeModel>{
    return this.http.put<EmployeeModel>(this.updateEmpUrl, emp);
  }

  deleteEmployee(emp: EmployeeModel): Observable <EmployeeModel>{
    return this.http.delete<EmployeeModel>(this.deleteEmpUrl+'/'+emp.id);
   }
  }

