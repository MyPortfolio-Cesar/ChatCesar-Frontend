import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private uri: string = `${environment.BACKEND_NODE_URL}/auth`
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(user:any){
    return this.http.post(`${this.uri}/sign-in`, user);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login')

  }
}
