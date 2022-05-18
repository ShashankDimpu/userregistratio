import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//HttpClient for API
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import the below modules
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

 
@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

