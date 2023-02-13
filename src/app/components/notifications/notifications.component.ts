import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INotification } from 'src/app/interfaces/INotification';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  progress_bar:boolean = false;
  userInfo = JSON.parse(localStorage.getItem('user') || '');
  notificationList: INotification[] = [];
  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.getNotifications();
  }

  getNotifications(){
    this.progress_bar = true;
    return new Promise<void>((resolve)=> {
      this.notificationService.getNotificationByUser(this.userInfo._id).subscribe((res:any)=> {
        console.log('res', res)
        this.notificationList = res.data;
        this.progress_bar = false;
      })
    })
  }

}
