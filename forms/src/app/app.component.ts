import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormGroupName } from '@angular/forms';
//import { RegistrationService } from './registration.service';
import { UserdataService } from './userdata.service';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/compiler/src/core';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { Router } from '@angular/router';
import { all, allSettled } from 'q';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators"; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  registrationForm: FormGroup;
  Users: any;
  Delete: any;
  Update: any;

  get EmpID(){
    return this.registrationForm.get('EmpID')
  }

  get Name(){
    return this.registrationForm.get('Name')
  }

  get EmpCode(){
    return this.registrationForm.get('EmpCode')
  }
  get Salary(){
    return this.registrationForm.get('Salary')
  }


  constructor(private UserdataService: UserdataService, private fb: FormBuilder, private router: Router, private http: HttpClient){
    
  }


  ngOnInit(){
    this.registrationForm = this.fb.group({
      EmpID: [''],
      Name: [''],
      EmpCode: [''],
      Salary: ['']
      })

  } 
  RegisterUser(userdata){
    console.log("usoo"); 
    console.log(userdata);
    // User data which we have received from the registration form.
    this.UserdataService.registerUsers(userdata).subscribe((reponse)=>{
      console.log(reponse);
     });
  }

  fillForm(registrationForm,reponse){
    console.log(reponse)
  registrationForm.value.Name=reponse[0].Name
  registrationForm.value.EmpCode=reponse[0].EmpCode
  registrationForm.value.Salary=reponse[0].Salary
  }


  GetUser(registrationForm){
    // User data which we have received from the registration form.
    this.UserdataService.getUsers(registrationForm).subscribe((reponse)=>{
    this.fillForm(this.registrationForm,reponse);
     });
  }

  GetAllUser(){
    // User data which we have received from the registration form.
    this.UserdataService.getAllUsers().subscribe((reponse)=>{
      console.log(reponse)
      this.Users=reponse;
      console.log("alma222", this.Users)
     });

    }
  
  DeleteUser(){
    console.log("usoo3"); 
    // User data which we have received from the registration form.
    this.UserdataService.deleteUsers().subscribe((data: any[])=>{
      console.log(data);
     });
  }

  onSelect(selectedItem : any){ //GetID
    console.log("Selected item Id: ", selectedItem.EmpID);
    this.Delete= selectedItem.EmpID;
  }

  DeleteSelectedUser(selectedItem: any){
    console.log("Selected item Id: ", selectedItem.EmpID);
    this.Delete= selectedItem.EmpID;
   return this.http.delete("http://localhost:3000/employees/" + this.Delete).subscribe(response => console.log(response));
  }

  UpdateUser(selectedItem: any){
    this.router.navigate(['/update/'+ selectedItem.EmpID +'/' + selectedItem.Name +'/' + selectedItem.EmpCode +'/' + selectedItem.Salary]);
    console.log("Selected item id: ", selectedItem.EmpID, selectedItem.Name, selectedItem.EmpCode, selectedItem.Salary);
    //this.Update= selectedItem.EmpID;
   //return this.http.put("http://localhost:3000/employees/" + this.Update, this.Update).subscribe(response => console.log(response));

  }


}
