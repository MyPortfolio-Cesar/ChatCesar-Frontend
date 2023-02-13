import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageChatService {

  
  private uri: string = `${environment.BACKEND_NODE_URL}/messages`;
  headers: any;
  token = localStorage.getItem('token');
  constructor(
    private http: HttpClient
  ) { 
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  }

  createMessageChat(newMessage: any){
    return this.http.post(`${this.uri}`, newMessage, {headers: this.headers});
  }
}
