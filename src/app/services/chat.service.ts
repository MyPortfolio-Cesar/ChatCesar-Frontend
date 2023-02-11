import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  titleChat: string = '';

  private uri: string = `${environment.BACKEND_NODE_URL}/chats`

  constructor(
    private http: HttpClient
  ) { }

  getOneChat(params: any){
    return this.http.post(`${this.uri}/getOneChat`, params);
  }

  getChat(id: any){
    return this.http.get(`${this.uri}/${id}`);
  }

  createChat(obj: any){
    return this.http.post(`${this.uri}`, obj);
  }

  
}
