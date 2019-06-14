import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client' ;
import { LoginPage } from 'src/app/public/login/login.page';
import { UserService} from '../../../services/user.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  providers: [UserService],
})
export class ChatPage implements OnInit {
  socket: SocketIOClient.Socket;
  
  
  

  constructor(private userService: UserService,) {
    this.socket= userService.getsocket();
    console.log(this.socket.id);
    this.socket.emit('connected');
    
   }

  ngOnInit() {
    

    
   
}
}