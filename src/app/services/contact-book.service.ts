import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactBookService {

  private uri: string = `${environment.BACKEND_NODE_URL}/contact-book`;
  headers: any;
  token = localStorage.getItem('token');
  constructor(
    private http: HttpClient
  ) {
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  }

  updateContactBook(obj:any){
    return this.http.put(`${this.uri}`, obj, {headers: this.headers});
  }

  getMyContactBook(idUser: any){
    return this.http.get(`${this.uri}/getMyContactBook/${idUser}`, {headers: this.headers});
  }

  addContactToBook(obj: any){
    return this.http.post(`${this.uri}/addContactToBook`, obj, {headers: this.headers});
  }
}
