import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Phone } from 'src/app/models/phone.model';
import { PhonesService } from 'src/app/services/phones.service';



@Component({
  selector: 'app-single-phone',
  templateUrl: './single-phone.component.html',
  styleUrls: ['./single-phone.component.css']
})
export class SinglePhoneComponent implements OnInit {

  phone = new Phone('', 0, '');
  constructor(
    private phoneService: PhonesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.phone = new Phone('', 0, '');
    const id = this.route.snapshot.params['id'];
    this.phoneService.getSinglePhone(+id).then(
      (phone:any)=>{
        this.phone = phone;
      }
    );
  }

  onBack(){
    this.router.navigate(['/phones']);
  }

}
