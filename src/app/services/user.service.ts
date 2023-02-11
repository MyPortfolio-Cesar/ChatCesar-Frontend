import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri: string = `${environment.BACKEND_NODE_URL}/users`
  constructor(
    private http: HttpClient
  ) { }

  getUsers(){
    return this.http.get(`${this.uri}`);
  }

  getUserInfo(id:string){
    return this.http.get(`${this.uri}/${id}`);
  }

  getAllOtherUsers(id: any){
    return this.http.get(`${this.uri}/getAllOtherUsers/${id}`);
  }

  updateUser(id:any, obj:any){
    return this.http.put(`${this.uri}/${id}`, obj);
  }
}
