import { Component, OnInit } from '@angular/core';
import { PhonesService } from '../services/phones.service';
import { Phone } from '../models/phone.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-phones-list',
  templateUrl: './phones-list.component.html',
  styleUrls: ['./phones-list.component.css']
})
export class PhonesListComponent implements OnInit {

  phones: Phone[]=[];
  phoneSubscription ?: Subscription;


  constructor(
    private phoneService: PhonesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.phoneSubscription = this.phoneService.phoneSubject.subscribe(
      (phones: Phone[])=>{
        this.phones = phones;
      }
    );
    this.phoneService.emitPhone();
  }

  // delete book
  onNewPhone() {
    this.router.navigate(['/phones', 'new']);
  }

  // delete phone
  onDeletePhone(phone: Phone){
    this.phoneService.removeBook(phone);
  }

  // onViewBook
  onViewBook(id: number){
    this.router.navigate(['/phones', 'view', id]);
  }

  ngOnDestroy(){
    this.phoneSubscription?.unsubscribe();
  }

}
 