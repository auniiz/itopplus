import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Contact } from '@itopplus/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  // Node/Express API
  REST_API: string = 'http://localhost:3334';

  // Http header
  httpHeaders = new HttpHeaders().set('Contest-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  // Add
  addContact(data: Contact): Observable<any> {
    let API_URL = `${this.REST_API}/addContact`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Get
  getContacts() {
    return this.httpClient.get(`${this.REST_API}/getContacts`);
  }

  getContact(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/getContact/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
        return res || {}
      }),
        catchError(this.handleError))
  }

  // Edit
  editContact(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/editContact/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteContact(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/deleteContact/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }


  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = ''
    if (error.error instanceof ErrorEvent) {
      // client error
      errorMessage = error.error.message;
    } else {
      // server error
      errorMessage = `Errro Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }


}
