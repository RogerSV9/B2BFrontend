import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client' ;
import { LoginPage } from 'src/app/public/login/login.page';
import { UserService} from '../../../services/user.service';
import { User } from 'src/app/models/user';
import { ChatService } from 'src/app/services/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  providers: [UserService],
})
export class ChatPage implements OnInit {
  socket: SocketIOClient.Socket;
  destusername: String;
  outputList: string[] = [];
  message: String;
  dest: String;
  sala: string[] = [];

  
    
  
  

  constructor(private chatService: ChatService,) {
    
  //  this.socket= userService.getsocket();
  //  console.log(this.socket);
  //  this.socket.emit('connected');
    
   }

  ngOnInit() {
    this.destusername= this.chatService.userdest;
    console.log(this.destusername);
    this.socket = this.chatService.socket;
    console.log('this is happening');
    console.log(this.socket);
    this.socket.emit('connected');
    this.socket.on('chat', function(mensaje, dest){
      
        
          if (dest == this.socket.id){
            console.log('Recibido');
            this.sala.push(mensaje);        
            
            }
         
      
      }.bind(this));  

      this.socket.on('usersconnected', function(socket){
        var socketlength = socket.length;
        console.log("Recibiendo usuarios conectados, hay " + socketlength);
        this.outputList = [];
        for (var i = 0; i <= socketlength-1; i++) {
            
          this.outputList.push(socket[i]);
          let username = socket[i].split(" ")[0];
          if ( username == this.destusername)
          {
              this.dest= socket[i].split(" ")[1];
          }  
                   
        }  
        console.log(this.outputList);

    }.bind(this));  


   
}
sendMessage(){
  this.socket.emit("chat", this.message, this.dest);
}

  
}