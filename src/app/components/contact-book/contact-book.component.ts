import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { ContactBookService } from 'src/app/services/contact-book.service';

@Component({
  selector: 'app-contact-book',
  templateUrl: './contact-book.component.html',
  styleUrls: ['./contact-book.component.css']
})
export class ContactBookComponent implements OnInit {

  userInfo= JSON.parse(localStorage.getItem('user') || '');
  myContactBook: any;
  progress_bar: boolean = false;
  constructor(
    private contactBookService: ContactBookService,
    private chatService: ChatService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.getMyContactBook()
  }

  getMyContactBook(){
    this.progress_bar = true;
    return new Promise<void>((resolve)=> {
      this.contactBookService.getMyContactBook(this.userInfo._id).subscribe((res:any) => {
        console.log('mybook', res);
        this.myContactBook = res.data;
      });
      this.progress_bar = false;
      resolve();
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
