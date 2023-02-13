import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestService {

  private uri: string = `${environment.BACKEND_NODE_URL}/friend-requests`;
  headers: any;
  token = localStorage.getItem('token');
  constructor(
    private http: HttpClient
  ) { 
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  }

  getRequestsByFrom(id:any){
    return this.http.get(`${this.uri}/getRequestsByFrom/${id}`, {headers: this.headers});
  }

  getRequestsByTo(id:any){
    return this.http.get(`${this.uri}/getRequestsByTo/${id}`, {headers: this.headers});
  }

  getRequestsByUser(id:any){
    return this.http.get(`${this.uri}/getRequestsByUser/${id}`, {headers: this.headers});
  }

  createFriendRequest(newRequest: any){
    return this.http.post(`${this.uri}`, newRequest, {headers: this.headers});
  }

  updateFriendRequest(id: any, obj: any){
    return this.http.put(`${this.uri}/${id}`, obj, {headers: this.headers});
  }

  deleteFriendRequest(id: any){
    return this.http.delete(`${this.uri}/${id}`, {headers: this.headers});
  }
}
