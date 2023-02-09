import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

interface IProduct {
  id: string,
  name: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {


  userInfo: any = JSON.parse(localStorage.getItem('user') || '')
  userList: any[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private chatService: ChatService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.getAllOtherUsers()
  }

  getAllOtherUsers(){
    return new Promise<any>((resolve, reject) => {
      this.userService.getAllOtherUsers(this.userInfo._id).subscribe((res:any) => {
        console.log('users', res)
        this.userList = res.data;
        resolve(null);
      })
    })
  }


  goToChat(user:any){
    console.log('user', user)

    let params ={
      userArray: [this.userInfo._id, user._id]
    } ;
    const httpParams = new HttpParams({
      fromObject: params
    })

    console.log('httpParams', httpParams)
    
    this.chatService.getOneChat(params).subscribe((res:any) => {
      console.log('chat', res);
      const idChat = res._id;
      this.router.navigateByUrl(`/chat/${idChat}`)
    }, (err) =>{ 
      alert(err.error.message);
    })
  }

}
