import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errorMessage:string = '';
  signUpForm = this.formBuider.group(
    {
      email : ['', [Validators.required, Validators.email]],
      password: ['',[ Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });

  constructor( private formBuider: FormBuilder,
               private authService: AuthService,
               private router: Router) { }

  ngOnInit(): void {
    this.signUpForm;
  }

  onSubmit(){
    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;

    this.authService.createNewUser(email, password).then(
      ()=>{
        this.router.navigate(['/phones']);
      },
      (error)=>{
        this.errorMessage = error;
      }
    )
  }

}
 