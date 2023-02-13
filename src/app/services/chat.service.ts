import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  titleChat: string = '';
  private uri: string = `${environment.BACKEND_NODE_URL}/chats`;

  headers: any;
  token = localStorage.getItem('token');

  constructor(
    private http: HttpClient
  ) { 
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  }

  getOneChat(params: any){
    return this.http.post(`${this.uri}/getOneChat`, params, {headers: this.headers});
  }

  getChat(id: any){
    return this.http.get(`${this.uri}/${id}`, {headers: this.headers});
  }

  createChat(obj: any){
    return this.http.post(`${this.uri}`, obj, {headers: this.headers});
  }

  
}
