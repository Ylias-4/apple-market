import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Phone } from '../models/phone.model';
import * as firebase from 'firebase/database';
import * as store from 'firebase/storage';
@Injectable({
  providedIn: 'root'
})
export class PhonesService {

  phones: Phone[] = [];
  phoneSubject =  new Subject<Phone[]>();
  constructor() {
    this.getPhones();
   }

  emitPhone(){
    this.phoneSubject.next(this.phones);
  }

  // save Phones to ref phone
  savePhones(){
    const ref = firebase.ref(firebase.getDatabase(), '/phones');
    firebase.set(ref, this.phones);
  }

  // get phones from database
    getPhones(){

      const ref = firebase.ref(firebase.getDatabase(), '/phones');

      firebase.onValue(ref, (data: firebase.DataSnapshot)=>{
        this.phones = data.val() ? data.val():[];
        this.emitPhone();
      })
    }

  // get Single phone
  getSinglePhone(id:number){
    return new Promise(
      (resolve, reject)=>{
        const ref = firebase.ref(firebase.getDatabase(), '/phones/'+id);
        firebase.onValue(ref, (data: firebase.DataSnapshot)=>{
          resolve(data.val());
        },(error)=>{
          reject(error);
        })
      }
    )
  }

  createNewPhone(newBook: Phone) {
    this.phones.push(newBook);
    this.savePhones();
    this.emitPhone();
  }

  removeBook(phone: Phone) {

    if(phone.photo){
      const url = phone.photo;
      const storageRef = store.ref(store.getStorage(), url);
      store.deleteObject(storageRef);
    }
    const bookIndexToRemove =  this.phones.findIndex(
      (phoneEl) => {
        if(phoneEl === phone) {
          return true;
        }
        else{
          return false
        }
      }
    );

    this.phones.splice(bookIndexToRemove, 1);
    this.savePhones();
    this.emitPhone();
  }

  // upload files
  uploadFile(file : File){

    const storage = store.getStorage();
    return new Promise(
      (resolve, reject)=>{
        const almostUniqueFileName = Date.now().toString();

        const url = 'images/'+almostUniqueFileName+file.name ;
        const upload = store.ref(storage, url);
        store.uploadBytes(upload, file).then(
          (data)=>{
           resolve(store.getDownloadURL(upload));
          },
          (error)=>{
            console.log('Erreur de chargement : '+error);
            reject();
          }
        );
      }
    );
  }
}
