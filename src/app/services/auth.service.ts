import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private uri: string = 'https://myapp-cesar-service.onrender.com/auth'
  constructor(
    private http: HttpClient
  ) { }

  login(user:any){
    return this.http.post(`${this.uri}/sign-in`, user);
  }
}
