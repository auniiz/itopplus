import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'itopplus-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})



export class ContactListComponent implements OnInit {
  p: any;
  Contacts: any = []

  constructor(
    private crudService: CrudService,
  ) { }

  ngOnInit(): void {
    this.crudService.getContacts().subscribe(res => {
      this.Contacts = res
    })
  }

  delete(id: any, i: any) {
    if (window.confirm('Do you want to delete?')) {
      this.crudService.deleteContact(id).subscribe((res) => {
        this.ngOnInit()
        // this.Contacts.splice(i, 1);
      })
    }

  }



}
