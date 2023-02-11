import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service/public-api';
import { ChatService } from 'src/app/services/chat.service';
import { MessageChatService } from 'src/app/services/message-chat.service';
import { IMessage } from 'src/app/interfaces/IMessage'
import { SocketWebService } from 'src/app/services/socket-web.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  titleChat: string = '';
  newMessageForm: FormGroup;
  productList: any[] = [];
  newMessage = {
    content: '',
    sender: '',
    chat: ''
  };
  otherUser: any;
  chatid:string;
  chatData: any;
  user: any = JSON.parse(localStorage.getItem('user') || '');
  idUser: any;
  messageList: any[] = [];

  progress_bar: boolean = false;
  constructor(
    private router: ActivatedRoute,
    private socketWebService: SocketWebService,
    private _formBuilder: FormBuilder,
    private chatService: ChatService,
    private messageChatService: MessageChatService
    // private cookieService: CookieService
  ) { 
    socketWebService.callback.subscribe(res => {
      console.log('res', res)
      this.messageList.push(res);
    })
   }
   ngAfterViewChecked() {        
    this.scrollToBottom();
  } 

  scrollToBottom(){
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight; 
  }

  ngOnInit(): void {
    
    this.chatid = this.router.snapshot.paramMap.get('id') || '';
    this.idUser = this.user._id;
    console.log(this.chatid);
    localStorage.setItem('chatid', this.chatid)
    this.newMessageForm = this._builderForm();
    this.getChat();
    this.titleChat = this.chatService.titleChat
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
    this.progress_bar = true;
    this.chatService.getChat(this.chatid).subscribe((res:any) => {
      console.log('chat found', res)
      this.chatData = res.data;
      this.messageList = res.data.messages;

      let users = res.data.users;

      this.otherUser = users.filter((u:any) => {
        return u._id != this.user._id
      });
      this.otherUser = this.otherUser[0];

      console.log('otherUser', this.otherUser)
      this.progress_bar = false;
    })
  }


  sendMessage(){
    let obj: IMessage = {
      chat: this.chatid,
      user: this.user._id,
      content: this.content.value
    }

    this.messageChatService.createMessageChat(obj).subscribe(res => {
      console.log('new mchat', res);
      this.messageList.push(obj)
      this.socketWebService.emitEvent(obj)
      this.content.setValue(null);
      this.scrollToBottom();
      
    })

    console.log(this.newMessage)
  }
}
