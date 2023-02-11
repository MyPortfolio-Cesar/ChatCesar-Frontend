import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketWebService extends Socket{  
  outEven: EventEmitter<any> = new EventEmitter();
  callback: EventEmitter<any> = new EventEmitter();
  callbackNotification: EventEmitter<any> = new EventEmitter();
  userInfo = JSON.parse(localStorage.getItem('user') || '');
  constructor() {
    super({
      url: environment.BACKEND_NODE_URL,
      options: {
        query: { 
          chatid: localStorage.getItem('chatid'),
          userID: JSON.parse(localStorage.getItem('user') || '')._id
        }
      }
    })
    this.listen();
    this.listenNotifications();
   }

   listen(){ 
    this.ioSocket.on('event-chat', (res:any) => this.callback.emit(res))
   }

   listenNotifications(){ 
    let chanell = `${this.userInfo._id}-event-notification`;
    console.log('chanell',chanell)
    this.ioSocket.on(chanell, (res:any) => this.callbackNotification.emit(res))
   }

   emitEvent(payload = {}){
    this.ioSocket.emit('event-chat', payload);
   }

   emitEventNotification(payload = {}){
    this.ioSocket.emit('event-notification', payload);
   }
}
