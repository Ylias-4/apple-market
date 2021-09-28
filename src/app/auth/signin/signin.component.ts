import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  errorMessage : string = '';
  signInForm = this.formBuilder.group(
    {
      email : ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    }
  )
  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.signInForm
  }

  onSubmit(){
    const email = this.signInForm.get('email')?.value;
    const password = this.signInForm.get('password')?.value;

    this.authService.signInUser(email, password).then(
      ()=>{
        this.router.navigate(['/phones']);
      },
      (error)=>{
        this.errorMessage = 'Password or email incorrect !';
      }
    )
  }

}
 