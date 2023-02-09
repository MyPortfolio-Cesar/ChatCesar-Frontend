import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this._builderForm();
  }

  _builderForm() {
    // const pattern = '[a-zA-Z ]{2,254}';
    const form = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],     
    });

    return form;
  }

  get username() {return this.loginForm.controls["username"]}
  get password() {return this.loginForm.controls["password"]}

  login(){
    console.log(this.loginForm.value)
    this.authService.login(this.loginForm.value).subscribe((res:any) => {
      console.log('res', res)
      let token = res.token;
      localStorage.setItem('token', token);
      let user = JSON.stringify(res.data)
      localStorage.setItem('user', user);
      this.router.navigateByUrl('/home')
    }, (err:any) => {
      alert(err.error.message)
      console.log('err login', err.error.message)
    })
  }

}
