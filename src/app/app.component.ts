import { Component } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'apple-market';
  constructor(){
    const firebaseConfig = {
      apiKey: "AIzaSyDVFGsh2PXUpyR88hYo4qrYL4auIJy1ffQ",
      authDomain: "apple-market-dakar.firebaseapp.com",
      projectId: "apple-market-dakar",
      storageBucket: "apple-market-dakar.appspot.com",
      messagingSenderId: "1078951480272",
      appId: "1:1078951480272:web:7982be142a0e9507a047d5",
      measurementId: "G-Y141JFX7Z1" 
    };
    firebase.initializeApp(firebaseConfig);
  }
}
