import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule ,  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { PhonesService } from './services/phones.service';
import { PhonesListComponent } from './phones-list/phones-list.component';
import { PhoneFormComponent } from './phones-list/phone-form/phone-form.component';
import { SinglePhoneComponent } from './phones-list/single-phone/single-phone.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent,
    PhonesListComponent,
    PhoneFormComponent,
    SinglePhoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, AuthGuardService, PhonesService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
