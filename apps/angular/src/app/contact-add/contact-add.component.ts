import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'itopplus-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css'],
})
export class ContactAddComponent implements OnInit {

  contactForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.contactForm = this.formBuilder.group({
      name: [''],
      address: [''],
      phone: [''],
      email: ['']
    })
  }

  ngOnInit(): void { }

  onSubmit(): any {
    this.crudService.addContact(this.contactForm.value)
      .subscribe(() => {
        console.log("Data added successfully!");
        window.alert('Success!')
        this.ngZone.run(() => this.router.navigateByUrl('/list'))
      }, (err) => {
        window.alert('This name already exists!')
        console.log(err)
      })
  }
}
