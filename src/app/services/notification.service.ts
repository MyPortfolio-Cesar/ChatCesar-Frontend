import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private uri: string = `${environment.BACKEND_NODE_URL}/notifications`;
  headers: any;
  token = localStorage.getItem('token');
  constructor(
    private http: HttpClient
  ) {
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    }) 
  }

  getNotificationByUser(idUser: any){
    return this.http.get(`${this.uri}/getNotificationByUser/${idUser}`, {headers: this.headers});
  }

  createNotification(newNotification: any){
    return this.http.post(`${this.uri}`, newNotification, {headers: this.headers});
  }

  updateNotification(id:any, noti:any){
    return this.http.put(`${this.uri}/${id}`, noti, {headers: this.headers});
  }
}
