import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Employee } from '../model/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  //employee !: Employee[];
  emps:any;
  empId !:number;
  empDetail !:FormGroup;
  empObj : Employee = new Employee();
  empList : Employee[] = [];


  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private api: ApiService,
    private formBuilder : FormBuilder
  ) 
  {
    this.api.users().subscribe((data)=>{
      console.warn("data",data);
      this.emps = data;
    })
   }
 
  ngOnInit(): void {
    this.empDetail = this.formBuilder.group({
      id:[''],
      email :[''],
      contact : [''],
      address : ['']
    });
    this.getEmployees();
  }

  getEmployees(){
    this.httpClient.get<any>('http://localhost:3000/employees').subscribe(
      response => {
        console.log(response);
        this.empList = response;
      },err =>{
        console.log("error while fetching data");
      }
    );
  }
  getEmpData(data:any){
    this.empDetail.reset();
    console.log(this.empDetail);
    this.api.saveUsers(data).subscribe((result) => {
      console.log(result);
      this.getEmployees();
    },err=>{
      console.log(err);
    });
      //;
        //this.ngOnInit();
   }
  
   editEmployee(emp: Employee,index:any){
    //this.empDetail.controls['id'].setValue(emp.id);
    console.log("emp",emp);
    this.empDetail.controls['email'].setValue(emp.email);
    this.empDetail.controls['contact'].setValue(emp.contact);
    this.empDetail.controls['address'].setValue(emp.address);
   }

   updateEmployee(b:any) {

    this.empObj.id = this.empDetail.value.id;
    this.empObj.email = this.empDetail.value.email;
    this.empObj.contact = this.empDetail.value.contact;
    this.empObj.address = this.empDetail.value.address;

    this.api.updateEmployee(b).subscribe((res: any)=>{
      console.log(res);
      this.getEmployees();
    },(err: any)=>{
      console.log(err);
    })

  }

  deleteEmployee (j:any){
    //console.log(j);
    this.api.deleteEmployee(j).subscribe(data =>{
      console.log(data);
      alert('Employee deleted successfully');
      this.getEmployees();
    },err => {
      console.log(err);
    });
    
  }
  

}


