import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms'
import { Router } from '@angular/router';
import { Employee } from '../model/employee';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  empDetail !: FormGroup;
  empObj : Employee = new Employee();
  empList : Employee[] = [];
   
  /*employeeData !: any;
  showAdd !:boolean;
  showUpdate !:boolean;*/

  constructor( 
    private formbuilder:FormBuilder,
    private api: ApiService,
    private router : Router) { }

  ngOnInit(): void {

    this.getAllEmployee();

    this.empDetail= this.formbuilder.group({
      id : [''],
      email : [''],
      contact : [''],
      address : ['']
    });   
    
  }
  /*home(){
    this.router.navigate(['/'])

  }*/

  addEmployee(){

    /*this.empDetail.reset();
    this.showAdd = true;
    this.showUpdate = false;*/
    console.log(this.empDetail);
    
    this.empObj.id = this.empDetail.value.id;
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
    this.api.getAllEmployee().subscribe(res=>{
      this.empList = res;
    },
    err=>{
      console.log("error while fetching data.")
    });
  }

  editEmployee(emp : Employee) {
    this.empDetail.controls['id'].setValue(emp.id);
    this.empDetail.controls['email'].setValue(emp.email);
    this.empDetail.controls['contact'].setValue(emp.contact);
    this.empDetail.controls['address'].setValue(emp.address);

  }

  updateEmployee() {

    this.empObj.id = this.empDetail.value.id;
    this.empObj.email = this.empDetail.value.email;
    this.empObj.contact = this.empDetail.value.contact;
    this.empObj.address = this.empDetail.value.address;

    this.api.updateEmployee(this.empObj).subscribe(res=>{
      console.log(res);
      this.getAllEmployee();
    },err=>{
      console.log(err);
    })

  }

  deleteEmployee(emp : Employee) {

    this.api.deleteEmployee(emp).subscribe(res=>{
      console.log(res);
      alert('Employee deleted successfully');
      this.getAllEmployee();
    },err => {
      console.log(err);
    });

  }

 

}
