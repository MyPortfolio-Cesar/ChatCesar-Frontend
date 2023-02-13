import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri: string = `${environment.BACKEND_NODE_URL}/users`;
  headers: any;
  token = localStorage.getItem('token');
  constructor(
    private http: HttpClient
  ) {
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
   }

  getUsers(){
    return this.http.get(`${this.uri}`, {headers: this.headers});
  }

  getUserInfo(id:string){
    return this.http.get(`${this.uri}/${id}`, {headers: this.headers});
  }

  getAllOtherUsers(id: any){
    return this.http.get(`${this.uri}/getAllOtherUsers/${id}`, {headers: this.headers});
  }

  updateUser(id:any, obj:any){
    return this.http.put(`${this.uri}/${id}`, obj, {headers: this.headers});
  }
}
