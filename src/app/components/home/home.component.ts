import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { FriendRequestService } from 'src/app/services/friend-request.service';
import { UserService } from 'src/app/services/user.service';
import { environment} from 'src/environments/environment';
import { IFriendRequest} from 'src/app/interfaces/IFriendRequest';
import { INotification} from 'src/app/interfaces/INotification';
import { NotificationService } from 'src/app/services/notification.service';
import { SocketWebService } from 'src/app/services/socket-web.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  progress_bar: boolean = false;
  env: string = environment.env
  userInfo: any = JSON.parse(localStorage.getItem('user') || '')
  userList: any[] = [];
  requestList: any[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private friendRequestService: FriendRequestService,
    private notificationService: NotificationService,
    private socketWebService: SocketWebService
  ) { }

  async ngOnInit() {
    await this.getAllOtherUsers()
    await this.getRequestsByUser();
    this.matchRequestwithUsers();
    // await this.getUsers();
  }

  getUsers(){
    return new Promise<any>((resolve, reject) => {
      this.userService.getUsers().subscribe((res:any) => {
        console.log('res', res)
        this.userList = res.data;
      })
    })
  }

  getAllOtherUsers(){
    return new Promise<void>((resolve, reject) => {
      this.progress_bar = true;
      this.userService.getAllOtherUsers(this.userInfo._id).subscribe((res:any) => {
        console.log('users', res)
        this.userList = res.data;
        this.progress_bar = false;
        resolve();
      })
    })
  }

  getRequestsByUser(){
    return new Promise<void>((resolve, reject) => {
      this.friendRequestService.getRequestsByUser(this.userInfo._id).subscribe((res:any) => {
        console.log('requests', res)
        this.requestList = res.data;
        resolve();
      })
    })
  }

  matchRequestwithUsers(){
    this.userList.forEach((u, index)=> {
      this.requestList.forEach(r => {
        // console.log(`req.to: ${r.to._id}, us.id: ${u._id}`);
        if(r.to._id === u._id || r.from._id === u._id){
          this.userList[index].status = r.status;
        }
      })
    });
    console.log(this.userList)
  }



  createRequest(user:any, index: number){
    let obj: IFriendRequest= {
      from: this.userInfo._id,
      to: user._id,
    };
    this.friendRequestService.createFriendRequest(obj).subscribe((res:any) => {
      alert('Se envió una solicitud de amistad');
      console.log('friend request created', res);
      this.userList[index].status = res.data.status;
      console.log(this.userList[index]);


      let obj: INotification = {
        content: `${this.userInfo.fullname} te envió una nueva solicitud de amistad`,
        to: this.userList[index]._id,
        type: 'FRIEND_REQUEST_SENT',
        redirectURL: '/requests-home'
      }
      this.notificationService.createNotification(obj).subscribe(res => {
        console.log('notification created', res);
        this.socketWebService.emitEventNotification(obj);
      })
      // this.userService.ge(this.)
    })
  }

}
