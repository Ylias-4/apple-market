import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/auth';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth?:boolean;

  constructor( private authService: AuthService) { }

  ngOnInit(): void {
    firebase.onAuthStateChanged(firebase.getAuth(),
    (user)=>{
      if(user){
        this.isAuth = true;
      }
      else{
        this.isAuth = false;
      }
    });
  }

  onSignOut(){
    this.authService.signOutUser();
  }

}
