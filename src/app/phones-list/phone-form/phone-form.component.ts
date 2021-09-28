import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Phone } from 'src/app/models/phone.model';
import { PhonesService } from 'src/app/services/phones.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-phone-form',
  templateUrl: './phone-form.component.html',
  styleUrls: ['./phone-form.component.css']
})
export class PhoneFormComponent implements OnInit {

  fileIsUploading = false;
  fileUrl:string='';
  fileUploaded = false;


  phoneForm = this.formBuilder.group(
    {
      name: ['', Validators.required],
      price: [0, Validators.required],
      description: ['', Validators.required]
    }
  )
  constructor(
    private formBuilder: FormBuilder,
    private phoneService: PhonesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.phoneForm;
  }

  onSubmit(){
    const name = this.phoneForm.get('name')?.value;
    const price = this.phoneForm.get('price')?.value;
    const description = this.phoneForm.get('description')?.value;
    const newPhone = new Phone(name, price, description);

    if(this.fileUrl && this.fileUrl !== '') {
      newPhone.photo = this.fileUrl;
    }
    this.phoneService.createNewPhone(newPhone);
    this.router.navigate(['/phones']);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;

    this.phoneService.uploadFile(file).then(
      (url: any) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
}

detectFiles(event:any){
  this.onUploadFile(event.target.files[0]);
}
}
 