import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  
  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.chat.messages.subscribe(msg =>{
      console.log(msg);

    })
  }
  sendMessage() {
    this.chat.sendMsg("Test Message");
  }

}
