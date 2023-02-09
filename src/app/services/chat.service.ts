import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private uri: string = 'https://myapp-cesar-service.onrender.com/chats'
  constructor(
    private http: HttpClient
  ) { }

  getOneChat(params: any){
    return this.http.post(`${this.uri}/getOneChat`, params);
  }

  getChat(id: any){
    return this.http.get(`${this.uri}/${id}`);
  }

  
}
