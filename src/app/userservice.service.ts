//HttpClient API service is used to make communication between front-end web apps with backend services. 
//This communication is done over HTTP protocol. 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//Observable module
import { Observable } from 'rxjs';
//user.ts class
import { user } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  getEmployeeById(Id: number) {
    throw new Error('Method not implemented.');
  }
  onSubmit() {
    throw new Error('Method not implemented.');
  }
//asp.net web api (the api should be running while consuming from Angular)
  url = 'https://localhost:44369/Api/UserRegistrations';  
  //Will invoke UserRegistrationsController->GetUserRegistrations()
  //GET->Read records
	  constructor(private http: HttpClient) { }  
	  getAllUsers(): Observable<user[]> {  
	    return this.http.get<user[]>(this.url );  
	  }  
	  getUserById(userId: number): Observable<user> {  
	    return this.http.get<user>(this.url + '/' + userId);  
	  } 
	  // Will invoke UserRegistrationsController->PostUserRegistration
	  createUser(user: user): Observable<user> {  
	    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
	    return this.http.post<user>(this.url ,  
	    user, httpOptions);  
	  } 
	  //Will invoke UserRegistrationsController->PutUserRegistration 
	  updateUser(user: user): Observable<user> {  
	    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
	    return this.http.put<user>(this.url + '/'+ user.id, 
	    user, httpOptions);  
	  }   
	  //Will invoke UserRegistrationsController->DeleteUserRegistration
	  deleteUserById(userid:number): Observable<number> {  
	    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
	    return this.http.delete<number>(this.url + '/DeleteUserDetails?id=' +userid,  
	 httpOptions);  
	  }  

	   //Will invoke UserRegistrationsController->DeleteUserRegistration
	  Login(Username:string,Password:string): Observable<user[]> {  
	    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
	    return this.http.request<user[]>(this.url + '/UserLogin?Username=&Password=' +Username,Password,  
	 httpOptions);  
	  }  

}