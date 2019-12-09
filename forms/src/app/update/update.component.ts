import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  //EmpID:  any;
  Form : FormGroup;
  EmpID: any;
  Name: string;
  EmpCode: string;
  Salary: any;
  Update: any;


  constructor(private route: ActivatedRoute, private fb: FormBuilder, private http: HttpClient, private router: Router) {
   }


  ngOnInit() {
    console.log('usla Alma2');
    this.route.paramMap.subscribe(params => {
      console.log("alma23", params.get('EmpID'));
      console.log("alma23", params.get('Name'));
      console.log("alma23", params.get('EmpCode'));
      console.log("alma23", params.get('Salary'));
      this.EmpID = params.get('EmpID');
      this.Name = params.get('Name');
      this.EmpCode = params.get('EmpCode');
      this.Salary = params.get('Salary');
    });

    

    this.Form = this.fb.group({
      Name: [''],
      EmpID: [''],
      EmpCode: [''],
      Salary: ['']
    })

    httpOptions.headers =
    httpOptions.headers.set('Authorization', 'my-new-auth-token');
  }

  UpdateUser(){

    console.log('usla Alma2');
    this.route.paramMap.subscribe(params => {
      console.log("alma23", params.get('EmpID'));
      console.log("alma23", params.get('Name'));
      console.log("alma23", params.get('EmpCode'));
      console.log("alma23", params.get('Salary'));
      this.EmpID = params.get('EmpID');
      this.Name = params.get('Name');
      this.EmpCode = params.get('EmpCode');
      this.Salary = params.get('Salary');
    })
    let Form = JSON.stringify(this.Form.value);
     return this.http.put("http://localhost:3000/employees", this.Update).subscribe(response => console.log(response));
    }
    
  

}
