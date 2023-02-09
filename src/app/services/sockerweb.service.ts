import { Injectable, EventEmitter } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SockerwebService extends Socket{

  outEven: EventEmitter<any> = new EventEmitter();
  callback: EventEmitter<any> = new EventEmitter();
  constructor() {
    
    super({
      url: 'https://myapp-cesar-service.onrender.com',
      options: {
        query: { 
          chatid: localStorage.getItem('chatid')
        }
      }
    })
    this.listen();
    
   }

   listen(){ 
    this.ioSocket.on('event-chat', (res:any) => this.callback.emit(res))
   }

   emitEvent(payload = {}){
    this.ioSocket.emit('event-chat', payload);
   }
}
