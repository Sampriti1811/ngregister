import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms'
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  empDetail !: FormGroup;
  empList : EmployeeModel[] = [];
  empObj : EmployeeModel = new EmployeeModel(); 
  employeeData !: any;
  showAdd !:boolean;
  showUpdate !:boolean;

  constructor( 
    private formbuilder:FormBuilder,
    private api: ApiService,
    private router : Router) { }

  ngOnInit(): void {

    this.empDetail= this.formbuilder.group({
      email : [''],
      contact : [''],
      address : ['']
    });
    this.getAllEmployee();
    
  }
  home(){
    this.router.navigate(['/'])

  }

  clickAddEmployee(){

    this.empDetail.reset();
    this.showAdd = true;
    this.showUpdate = false;

    console.log(this.empDetail);
    this.empObj.email = this.empDetail.value.email;
    this.empObj.contact = this.empDetail.value.contact;
    this.empObj.address = this.empDetail.value.address;

    this.api.addEmployee(this.empObj).subscribe((res: any)=>{
         console.log(res);
         this.getAllEmployee();
    },
    (err: any)=>{
      console.log(err);
  });
    /*this.empDetail.reset();
    this.showAdd = true;
    this.showUpdate = false;*/
  }

  /*postEmployeeDetails(){
    
    this.empObj.email = this.empDetail.value.email;
    this.empObj.contact = this.empDetail.value.contact;
    this.empObj.address = this.empDetail.value.address;

    this.api.postEmployee(this.empObj).subscribe((res: any)=>{
      console.log(res);
      alert("Employee Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.empDetail.reset();
      this.getAllEmployee();
    },
      (err: any)=>{
      alert("Something went wrong")
    }
    )
  }*/

  getAllEmployee(){
    this.api.getEmployee().subscribe(res=>{
      this.empList = res;
    },err=>{
      console.log("error while fetching data.")
    });
  }

  deleteEmployee(emp: EmployeeModel){

    this.api.deleteEmployee(emp).subscribe(res=>{
      console.log(res);
      alert("Employee Deleted")
      this.getAllEmployee();
    },err => {
      console.log(err);
  });
  }

  onEdit(emp: EmployeeModel){
    this.showAdd = false;
    this.showUpdate = true;
    this.empObj.id = emp.id;
    
    this.empDetail.controls['email'].setValue(emp.email);
    this.empDetail.controls['contact'].setValue(emp.contact);
    this.empDetail.controls['address'].setValue(emp.address);
  }

  updateEmployeeDetails(){
    this.empObj.name = this.empDetail.value.name;
    this.empObj.email = this.empDetail.value.email;
    this.empObj.contact = this.empDetail.value.contact;
    this.empObj.address = this.empDetail.value.address;

    this.api.updateEmployee(this.empObj).subscribe(res=>{
      alert("Updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.empDetail.reset();
      this.getAllEmployee();
    })
  }

}
