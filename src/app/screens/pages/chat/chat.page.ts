import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client' ;
import { LoginPage } from 'src/app/public/login/login.page';
import { UserService} from '../../../services/user.service';
import { User } from 'src/app/models/user';
import { ChatService } from 'src/app/services/chat.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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
  message: string;
  dest: String;
  sala: String[] = [];
  myusername: string;
  rate: number;
  user: User;
  usernamedestid: String;
 

  
    
  
  

  constructor(private chatService: ChatService,private userService: UserService, public alertController: AlertController, private router: Router,) {
    this.usernamedestid=""
    this.user= new User();
    
   }

  ngOnInit() {
    this.myusername=this.chatService.myusername;
    console.log("My username is:" + this.myusername);
    this.destusername= this.chatService.userdest;
    this.getUserbyusername();
    console.log(this.destusername);
    this.socket = this.chatService.socket;
    console.log('this is happening');
    console.log(this.socket);
    this.socket.emit('connected');
    this.socket.on('chat', function(username, mensaje, dest){
      
        
          if (dest == this.socket.id){
            console.log('Recibido');
            this.sala.push(username +": "+mensaje);        
            
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
  this.socket.emit("chat", this.myusername, this.message, this.dest);
  this.sala.push(this.myusername+": "+this.message);

}

getUserbyusername(){
  console.log("destusername: "+this.destusername)
  this.userService.getUserbyusername(this.destusername)
        .subscribe(res =>{
          this.user = res;
          /* console.log("user: "+this.user.name)
          console.log("user: "+this.user._id)
          this.usernamedestid= this.user._id; */
          console.log("DEST: "+this.usernamedestid)
            });
}
rating() {
  this.showCheckbox();
}

async showCheckbox() {
const alert = await this.alertController.create({
  header: 'How do you calify this user?',
  inputs: [
    {
      name: 'radio0',
      type: 'radio',
      label: '0',
      value: '0',
      checked: true
    },
    {
      name: 'radio1',
      type: 'radio',
      label: '1',
      value: '1',
      checked: false
    },
    {
      name: 'radio2',
      type: 'radio',
      label: '2',
      value: '2',
      checked: false
    },
    {
      name: 'radio3',
      type: 'radio',
      label: '3',
      value: '3',
      checked: false
    },
    {
      name: 'radio4',
      type: 'radio',
      label: '4',
      value: '4',
      checked: false
    },
    {
      name: 'radio5',
      type: 'radio',
      label: '5',
      value: '5',
      checked: false
    }
  ],
  buttons: [
    {
      text: 'Cancel',
      role: 'cancel',
      cssClass: 'secondary',
      handler: () => {
        console.log('Confirm Cancel');
      }
    }, {
      text: 'Ok',
      handler: rate1 => {
        console.log('Confirm Ok');
        console.log('Value: '+rate1);
        this.rate = parseInt(rate1)
        console.log('Value: '+this.rate);
        console.log('username: '+this.destusername);
        this.userService.postrating(this.destusername, this.rate)
        .subscribe(res =>{
          console.log(res)
            });
      }
    }
  ]
});

await alert.present();
}
  
}