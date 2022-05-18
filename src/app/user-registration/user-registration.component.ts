import { Component, OnInit } from '@angular/core';
//Observable module to Observables provide support for passing messages between 
//parts of your application. They are used frequently in Angular and are 
//the recommended technique for event handling, 
//asynchronous programming, and handling multiple values.
 import { Observable } from 'rxjs';

//import user.ts
import { user } from '../user';
//importuser-service.service.ts
import { UserServiceService } from '../userservice.service';
//import for Form designing in Angular
import { FormGroup,FormControl } from '@angular/forms';
//import for Form designing in Angular
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit 
{

  Gender = ['male', 'female'];
  allUsers !:Observable<user[]>; 
  userForm !:FormGroup;
  //dataSaved = false;
  userIdUpdate: null| any;
  employeeForm:any;
  updateEmployeeId=null;
  // Userservice: any;
  
 
 
  //message = null;
  //inheriting UserServiceService from user-service.service.ts
  //DEPENDENCY INJECTION
  constructor(private userservice:UserServiceService,private router: Router)
  {

  }
  //create a function onSubmit 
  onSubmit()
  {
    console.log(this.userForm)
    //this.dataSaved = false;
    const user = this.userForm.value;
    //Invoking the CreateUser function
    this.CreateUser(user);
    
    this.userForm.reset();
  }
  
  //create a function CreateUser for registration of a new user
  CreateUser(user: user) {
    if (this.userIdUpdate == null) {
      //subscribe() is a method on the Observable type. The Observable type is a 
      //utility that asynchronously or synchronously streams data 
      //to a variety of components or services that have subscribed to the observable.
      this.userservice.createUser(user).subscribe(
        () => {
          //this.dataSaved = true;
          //this.message = 'Record saved Successfully';
          this.loadAllUsers();
          //this.router.navigate(['/Login']);
          this.userIdUpdate = null;
          
        }
      );
    } else {
       user.id = this.userIdUpdate;
       this.userservice.updateUser(user).subscribe(() => {
       //this.dataSaved = true;
        //this.message = 'Record Updated Successfully';
       this.loadAllUsers();
       this.userIdUpdate = null;
       this.userForm.reset();
      });
    }
  }
  ngOnInit(): void {
    this.loadAllUsers();
    console.log(this.allUsers)
    this.userForm=new FormGroup({
      'Name':new FormControl(null),
      'Email':new FormControl(null),
      'Gender':new FormControl(null),
      'Username':new FormControl(null),
      'Password':new FormControl(null)
    })
  }
  loadAllUsers()
  {
    this.allUsers=this.userservice.getAllUsers();
  }
  //create a function loadUserToEdit to update the details of existing user
  loadUserToEdit(userId: number) 
  {
     this.userservice.getUserById(userId).subscribe(user => 
     {
     //this.message = null;
      //this.dataSaved = false;
     this.userIdUpdate = user.id;
     this.userForm.controls['Name'].setValue(user.Name);
     this.userForm.controls['Email'].setValue(user.Email);
     this.userForm.controls['Gender'].setValue(user.Gender);
     this.userForm.controls['Username'].setValue(user.Username);
    this.userForm.controls['Password'].setValue(user.password);
     });

  }
  //create a function deleteUser to delete an existing user
  deleteUser(userId: number) {
    if (confirm("Are you sure you want to delete this ?")) {  
    this.userservice.deleteUserById(userId).subscribe(() => {
      //this.dataSaved = true;
     // this.message = 'Record Deleted Succefully';
      this.loadAllUsers();
      this.userIdUpdate = null;
      this.userForm.reset();

    });
  }
}
  resetForm() {
    this.userForm.reset();
    //this.message = null;
    //this.dataSaved = false;
  }
}