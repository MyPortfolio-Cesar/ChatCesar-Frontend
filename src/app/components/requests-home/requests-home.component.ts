import { Component, OnInit } from '@angular/core';
import { IFriendRequest } from 'src/app/interfaces/IFriendRequest';
import { INotification } from 'src/app/interfaces/INotification';
import { ChatService } from 'src/app/services/chat.service';
import { ContactBookService } from 'src/app/services/contact-book.service';
import { FriendRequestService } from 'src/app/services/friend-request.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SocketWebService } from 'src/app/services/socket-web.service';

@Component({
  selector: 'app-requests-home',
  templateUrl: './requests-home.component.html',
  styleUrls: ['./requests-home.component.css']
})
export class RequestsHomeComponent implements OnInit {

  userInfo = JSON.parse(localStorage.getItem('user') || '');
  progress_bar_accept_request:boolean = false;
  requestSentList: any[] = [];
  requestReceivedList: any[] = [];
  constructor(
    private friendRequestService: FriendRequestService,
    private contactBookService: ContactBookService,
    private chatService: ChatService,
    private notificationService: NotificationService,
    private socketWebService: SocketWebService
  ) { }

  async ngOnInit(){
    await this.getRequestsSent();
    await this.getRequestsReceived();
  }

  async getRequestsSent(){
    return new Promise<void>((resolve, reject) => {
      this.friendRequestService.getRequestsByFrom(this.userInfo._id).subscribe((res:any) => {
        console.log('enviadas', res);
        this.requestSentList = res.data;
        this.requestSentList =  this.requestSentList.filter(r => {
          return r.status === 'PENDING'
        })
        resolve();
      })
    })
  }

  async getRequestsReceived(){
    return new Promise<void>((resolve, reject) => {
      this.friendRequestService.getRequestsByTo(this.userInfo._id).subscribe((res:any) => {
        console.log('recibidas', res);
        this.requestReceivedList = res.data;
        this.requestReceivedList =  this.requestReceivedList.filter(r => {
          return r.status === 'PENDING'
        })
        resolve();
      })
    })
  }


  acceptFriendRequest(request:any, index: number){
    // console.log('request', request); return
    this.progress_bar_accept_request = true;
    console.log('id', request);
    let from = request.from._id;
    let to = request.to;
    let arrayUsers = [from, to];
    const idRequestFriend = request._id;
    let obj = {
      status: 'ACCEPTED'
    }
    this.friendRequestService.updateFriendRequest(idRequestFriend, obj).subscribe(res => {
      console.log('frinend request updated', res);
      let obj = {
        userOwner: from, 
        userAdded: to
      }
      this.contactBookService.addContactToBook(obj).subscribe(res => {
        console.log('contactbook service updated', res);
        let obj = {
          userOwner: to, 
          userAdded: from
        }
        this.contactBookService.addContactToBook(obj).subscribe(res => {
          console.log('contactbook service updated 2', res);

          let obj = {
            users: arrayUsers
          }
          this.chatService.createChat(obj).subscribe(res => {
            console.log('chat created', res);

            let obj: INotification = {
              content: `${this.userInfo.fullname} es tu nuevo amigo`,
              to: from,
              type: 'FRIEND_REQUEST_ACCEPTED',
              redirectURL: '/contact-book'
            };
            this.notificationService.createNotification(obj).subscribe(res => {
              this.progress_bar_accept_request = false;
              this.socketWebService.emitEventNotification(obj);
              alert('Se agregó a tus amigos')
            })
          })
        })
      })

    })
  }

  deleteFriendRequest(id: any, index:number, type: string){
    this.friendRequestService.deleteFriendRequest(id).subscribe(res => {
      console.log('friend request deleted', res);
      switch(type){
        case "received":
            this.requestReceivedList.splice(index,1)
          break;
        case "sent":
            this.requestSentList.splice(index, 1)
          break;
      }
    })
  }


  



}
