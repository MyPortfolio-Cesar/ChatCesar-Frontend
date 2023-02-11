import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestService {

  private uri: string = `${environment.BACKEND_NODE_URL}/friend-requests`
  constructor(
    private http: HttpClient
  ) { }

  getRequestsByFrom(id:any){
    return this.http.get(`${this.uri}/getRequestsByFrom/${id}`);
  }

  getRequestsByTo(id:any){
    return this.http.get(`${this.uri}/getRequestsByTo/${id}`);
  }

  getRequestsByUser(id:any){
    return this.http.get(`${this.uri}/getRequestsByTo/${id}`);
  }

  createFriendRequest(newRequest: any){
    return this.http.post(`${this.uri}`, newRequest);
  }

  updateFriendRequest(id: any, obj: any){
    return this.http.put(`${this.uri}/${id}`, obj);
  }

  deleteFriendRequest(id: any){
    return this.http.delete(`${this.uri}/${id}`);
  }
}
