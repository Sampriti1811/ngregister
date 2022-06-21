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

  formValue !: FormGroup;

  employeeModelObj : EmployeeModel = new EmployeeModel(); 
  employeeData !: any;
  showAdd !:boolean;
  showUpdate !:boolean;

  constructor( 
    private formbuilder:FormBuilder,
    private api: ApiService,
    private router : Router) { }

  ngOnInit(): void {

    this.formValue= this.formbuilder.group({
      name : [''],
      email : [''],
      contact : [''],
      address : ['']
    })
    this.getAllEmployee();
    
  }
  home(){
    this.router.navigate(['/'])

  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails(){
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.contact = this.formValue.value.contact;
    this.employeeModelObj.address = this.formValue.value.address;

    this.api.postEmployee(this.employeeModelObj).subscribe((res: any)=>{
      console.log(res);
      alert("Employee Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
      (err: any)=>{
      alert("Something went wrong")
    }
    )
  }

  getAllEmployee(){
    this.api.getEmployee().subscribe(res=>{
      this.employeeData = res;
    })
  }

  deleteEmployee(row: any){
    this.api.deleteEmployee(row.id).subscribe(res=>{
      alert("Employee Deleted")
      this.getAllEmployee();
    })
  }

  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['contact'].setValue(row.contact);
    this.formValue.controls['address'].setValue(row.address);
  }

  updateEmployeeDetails(){
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.contact = this.formValue.value.contact;
    this.employeeModelObj.address = this.formValue.value.address;

    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }

}
