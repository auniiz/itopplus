import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'itopplus-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService

  ) {
    this.updateForm = new FormGroup({
      name: new FormControl(),
      address: new FormControl(),
      phone: new FormControl(),
      email: new FormControl()
    });

    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.crudService.getContact(this.getId).subscribe(res => {
      this.updateForm.setValue({
        name: res['name'],
        address: res['address'],
        phone: res['phone'],
        email: res['email'],
      })

      this.formBuilder.group({
        name: [''],
        address: [''],
        phone: [''],
        email: ['']
      })
    })
  }

  ngOnInit(): void { }

  onUpdate(): any {
    this.crudService.editContact(this.getId, this.updateForm.value).subscribe(() => {
      window.alert('Success!')
      this.ngZone.run(() => { this.router.navigateByUrl('/list') })
    }, (err) => {
      window.alert('This name already exists!')
      console.log(err)
    }
    )
  }

}
