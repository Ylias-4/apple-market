import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PhonesListComponent } from './phones-list/phones-list.component';
import { PhoneFormComponent } from './phones-list/phone-form/phone-form.component';
import { SinglePhoneComponent } from './phones-list/single-phone/single-phone.component';
import { AuthGuardService } from './services/auth-guard.service';



const routes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'phones', canActivate: [AuthGuardService], component: PhonesListComponent },
  { path: 'phones/new', canActivate: [AuthGuardService], component: PhoneFormComponent },
  { path: 'phones/view/:id', canActivate: [AuthGuardService], component: SinglePhoneComponent },
  { path:'', redirectTo: 'phones', pathMatch:'full'},
  { path:'**', redirectTo:'phones'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
