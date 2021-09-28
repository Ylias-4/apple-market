import { Injectable } from '@angular/core';
import * as firebase from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  // create a new user
  createNewUser(email:string, password:string) {

    return new Promise(
      (resolve, reject)=>{
        firebase.createUserWithEmailAndPassword(firebase.getAuth(),email, password).then(
          (userCredential)=>{
            resolve(userCredential);
          },
          (error)=>{
            reject(error);
          }
        )
      }
    )
  }

  // connect an existant user
  signInUser(email:string, password:string) {
    return new Promise(
      (resolve, reject) =>{
        firebase.signInWithEmailAndPassword(firebase.getAuth(), email, password).then(
          (userCredential)=>{
            resolve(userCredential);
          },
          (error)=>{
            reject(error);
          }
        )
      }
    )
  }

  // disconnect user
  signOutUser(){
    firebase.signOut(firebase.getAuth()).then(
      ()=>{
        console.log('Sign Out successfuly');
      },
      (error)=>{
        console.log('An error happened: '+error);
        
      }

    );
  }

  
}
 