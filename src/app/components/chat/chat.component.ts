import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service/public-api';
import { ChatService } from 'src/app/services/chat.service';
import { MessageChatService } from 'src/app/services/message-chat.service';
import { SockerwebService } from 'src/app/services/sockerweb.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  newMessageForm: FormGroup;
  productList: any[] = [];
  newMessage = {
    content: '',
    sender: '',
    chat: ''
  };
  chatid:string;
  chatData: any;
  user: any = JSON.parse(localStorage.getItem('user') || '');
  idUser: any;
  messageList: any[] = [];
  constructor(
    private router: ActivatedRoute,
    private wbs: SockerwebService,
    private _formBuilder: FormBuilder,
    private chatService: ChatService,
    private messageChatService: MessageChatService
    // private cookieService: CookieService
  ) { 
    wbs.callback.subscribe(res => {
      console.log('res', res)
      this.messageList.push(res);
    })
   }

  ngOnInit(): void {
    this.chatid = this.router.snapshot.paramMap.get('id') || '';
    this.idUser = this.user._id;
    console.log(this.chatid);
    localStorage.setItem('chatid', this.chatid)
    this.newMessageForm = this._builderForm();
    this.getChat();
    // this.cookieService.set('chat', this.chatid);

  }

  
  _builderForm() {
    const form = this._formBuilder.group({
      content: [''],
    });

    return form;
  }
  get content() {return this.newMessageForm.controls["content"]}

  getChat() {
    this.chatService.getChat(this.chatid).subscribe((res:any) => {
      console.log('chat found', res)
      this.chatData = res.data;
      this.messageList = res.data.messagesChat;
    })
  }


  sendMessage(){
    this.newMessage = {
      chat: this.chatid,
      sender: this.user._id,
      content: this.content.value
    }

    this.messageChatService.createMessageChat(this.newMessage).subscribe(res => {
      console.log('new mchat', res);
      this.messageList.push(this.newMessage)
      this.wbs.emitEvent(this.newMessage)
      this.content.setValue(null);
      
    })

    console.log(this.newMessage)
  }
}
