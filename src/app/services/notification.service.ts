import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private uri: string = `${environment.BACKEND_NODE_URL}/notifications`;
  constructor(
    private http: HttpClient
  ) { }

  getNotificationByUser(idUser: any){
    return this.http.get(`${this.uri}/getNotificationByUser/${idUser}`);
  }

  createNotification(newNotification: any){
    return this.http.post(`${this.uri}`, newNotification);
  }

  updateNotification(id:any, noti:any){
    return this.http.put(`${this.uri}/${id}`, noti);
  }
}
