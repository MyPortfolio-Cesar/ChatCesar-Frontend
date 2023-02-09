import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageChatService {

  private uri: string = 'https://myapp-cesar-service.onrender.com/messages-chat'
  constructor(
    private http: HttpClient
  ) { }

  createMessageChat(newMessage: any){
    return this.http.post(`${this.uri}`, newMessage);
  }
}
