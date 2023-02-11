import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageChatService {

  
  private uri: string = `${environment.BACKEND_NODE_URL}/messages`
  constructor(
    private http: HttpClient
  ) { }

  createMessageChat(newMessage: any){
    return this.http.post(`${this.uri}`, newMessage);
  }
}
