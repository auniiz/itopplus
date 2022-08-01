import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@itopplus/api-interfaces';

@Component({
  selector: 'itopplus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('http://localhost:3334/api');
  constructor(private http: HttpClient) {}
}
