import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactBookService {

  private uri: string = `${environment.BACKEND_NODE_URL}/contact-book`
  constructor(
    private http: HttpClient
  ) { }

  updateContactBook(obj:any){
    return this.http.put(`${this.uri}`, obj);
  }

  getMyContactBook(idUser: any){
    return this.http.get(`${this.uri}/getMyContactBook/${idUser}`);
  }

  addContactToBook(obj: any){
    return this.http.post(`${this.uri}/addContactToBook`, obj);
  }
}
