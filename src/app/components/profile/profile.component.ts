import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/interfaces/IUser'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  editForm: FormGroup;
  userID = JSON.parse(localStorage.getItem('user') || '')._id;
  userInfo: any;
  isEditable: boolean = false;
  progress_bar: boolean = false;
  progress_bar_edit_profile: boolean = false;
  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  async ngOnInit() {
    this.editForm = this._builderForm();
    await this.getUserInfo();    
  }

  _builderForm() {
    // const pattern = '[a-zA-Z ]{2,254}';
    const form = this._formBuilder.group({
      fullname: [{value: '', disabled: true},  [Validators.required]],
      username: [{value: '', disabled: true}, [Validators.required]],
      email: [{value: '', disabled: true}, [Validators.required]],

    });
    return form;
  }
  get fullname() {return this.editForm.controls["fullname"]}
  get username() {return this.editForm.controls["username"]}
  get email() {return this.editForm.controls["email"]}

  checkChange(event:any){
    this.isEditable = event.target.checked;
    console.log('hola', )
    if(this.isEditable === true){
      this.fullname.enable();
      this.username.enable();
      this.email.enable();
    }else{
      this.fullname.disable();
      this.username.disable();
      this.email.disable();
    }
  }

  getUserInfo(){
    this.progress_bar = true;
    return new Promise<void>((resolve) => {
      this.userService.getUserInfo(this.userID).subscribe((res:any) => {
        console.log('res', res)
        this.userInfo = res.data;
        this.fullname.setValue(this.userInfo.fullname);
        this.username.setValue(this.userInfo.username);
        this.email.setValue(this.userInfo.email);
        this.progress_bar = false;
        resolve();
      })
    })
  }

  editProfile(){
    this.progress_bar_edit_profile = true;
    let obj: IUser = {
      fullname: this.fullname.value,
      email: this.email.value,
      username: this.username.value
    }
    this.userService.updateUser(this.userInfo._id, obj).subscribe(res => {
      console.log('user updated', res);
      this.fullname.disable();
      this.username.disable();
      this.email.disable();
      alert('User updated');
      this.isEditable = false;
      this.progress_bar_edit_profile = false;
    })
  }

}
