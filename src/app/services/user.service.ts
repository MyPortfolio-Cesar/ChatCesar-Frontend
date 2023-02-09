import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uriLocal: string = 'http://localhost:3000/users';
  uri: string = 'https://myapp-cesar-service.onrender.com/users'
  constructor(
    private http: HttpClient
  ) { }

  getAllOtherUsers(id: any){
    return this.http.get(`${this.uriLocal}/getAllOtherUsers/${id}`);
  }
}
