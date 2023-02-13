import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.registerForm = this._builderForm();
  }

  _builderForm() {
    // const pattern = '[a-zA-Z ]{2,254}';
    const form = this._formBuilder.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],     
    });

    return form;
  }

  get fullname() {return this.registerForm.controls["fullname"]}
  get email() {return this.registerForm.controls["email"]}
  get username() {return this.registerForm.controls["username"]}
  get password() {return this.registerForm.controls["password"]}

  register(){
    let newUser = {
      fullname: this.fullname.value,
      email: this.email.value,
      username: this.username.value,
      password: this.password.value
    };

    this.authService.register(newUser).subscribe((res:any) => {
      console.log('res register', res);
      let token = res.token;
      localStorage.setItem('token', token);
      let user = JSON.stringify(res.data)
      localStorage.setItem('user', user);
      this.router.navigateByUrl('/home')
    }, (err:any) => {
      alert(err.error.message)
      console.log('err register', err.error.message)
    })
  }

}
