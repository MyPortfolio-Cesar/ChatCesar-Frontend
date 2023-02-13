import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SocketWebService } from 'src/app/services/socket-web.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  notificationList: any[] = [];
  notificationListSeen: any[] = [];
  notificationListNoSeen: any[] = [];
  userInfo = JSON.parse(localStorage.getItem('user') || '');
  constructor(
    private authService: AuthService,
    private socketWebService: SocketWebService,
    private toastr: ToastrService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    socketWebService.callbackNotification.subscribe(res => {
      console.log('res new notification', res);
      this.toastr.info(res.content);
      this.notificationListNoSeen.push(res);
      // this.messageList.push(res);
    })

    // this.toastr.info('fjdskjfdsk');
   }

  async ngOnInit(){
    // console.log(this.userInfo)
    await this.getNotificationsByUser();
  }

  async getNotificationsByUser(){
    return new Promise<void>((resolve) => {
      this.notificationService.getNotificationByUser(this.userInfo._id).subscribe((res:any) => {
        // console.log('res', res);
        this.notificationList = res.data;
        this.notificationListNoSeen = this.notificationList.filter(n => {
          return n.seen === false;
        })
        this.notificationListSeen = this.notificationList.filter(n => {
          return n.seen === true;
        })
        resolve();
      })
    })
  }

  goToNotification(noti:any){
    let obj = {
      seen: true
    }
    this.notificationService.updateNotification(noti._id, obj).subscribe(res => {
      console.log('noti updated', res);
      this.router.navigateByUrl(noti.redirectURL);
    })
    console.log(noti)
  }

  logout(){
    this.authService.logout();
  }

}
