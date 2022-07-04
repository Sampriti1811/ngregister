import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/shared/api.service';


@Component({
  selector: 'app-addemp',
  templateUrl: './addemp.component.html',
  styleUrls: ['./addemp.component.css']
})
export class AddempComponent implements OnInit {
  emps: any;
 

  constructor(
    private modalService: NgbModal,
    private api: ApiService
  ) { 
    this.api.users().subscribe((data)=>{
      console.warn("data",data);
      this.emps = data;
    })
  }
  ngOnInit(): void {
  }

  getEmpData(data:any){
    this.api.saveUsers(data).subscribe((result) => {
      console.warn(result);
        //this.ngOnInit();
   
    });
  }
   


}
