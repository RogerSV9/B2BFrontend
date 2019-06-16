import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import * as moment from 'moment';
import { AlertController } from '@ionic/angular';
import { ChatService} from '../../../services/chat.service';


let userid;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})


export class HomePage implements OnInit {
  user: User;
  userDestId: string;
  cardsList: User[] = [];
  onecard: User;
  counter: number;
  age: number;


  constructor(private userService: UserService, 
              private router: Router, 
              private activatedRouter: ActivatedRoute,
              public alertController: AlertController,
              private chatService: ChatService) {
    this.user= new User();
    this.counter=0;
  }

  ngOnInit() {
    this.activatedRouter.params.subscribe(params =>{
      if (typeof params ['id'] !== 'undefined'){
        this.user._id = params['id'];
      }
      else{
        this.user._id = '';
      }
    });
    userid = this.user._id;
    this.UsersList();
  }

  goBack() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  UsersList(){
    let data = localStorage.getItem('id');
    let user = new User(data, null, null,null, null, null, null, null, null, null, null, null);
    console.log(user)
    this.userService.UsersList(user)
    .subscribe(res =>{
      this.userService.user= res as User[];
      this.cardsList = res;
      
      this.ShowOneCard();
      console.log(res);
      console.log(this.cardsList)
      
    });
  }

  ShowOneCard(){
  //let i = this.counter;
  this.counter=this.counter
  console.log("SOC"+this.counter)
  this.onecard = this.cardsList[this.counter];
  if ( this.onecard == null ){
    this.nomatches();
    this.router.navigateByUrl('/menu/editprofile');
  }
  else{
  this.age = this.ageFromDateOfBirthday(this.onecard.age)
  console.log(this.age)
}

  /* for (let i in this.cardsList){
    this.onecard = this.cardsList[i];
    console.log(this.onecard)
  } */
  }


  acceptMatch(){

    let userSourceId = localStorage.getItem('id'); 
    this.userDestId = this.onecard._id;
    let destiusername = this.onecard.username;

    console.log("Source"+userSourceId)
    console.log("Dest"+this.userDestId)
    console.log("source: "+userSourceId)
    this.userService.acceptMatch(userSourceId, this.userDestId)
    .subscribe(res => {
      if (this.counter < this.cardsList.length-1) {
        this.counter++;
        this.ShowOneCard();
      }
      else if (this.counter === this.cardsList.length-1){
        this.accept();
        this.counter=0;
        this.ShowOneCard();
      }  
      else {
        this.counter=0;
        this.ShowOneCard();
      }  
      console.log(res)
    });

    this.chatService.userdest=destiusername;

    this.router.navigateByUrl('/chat');
  }

  discardMatch(){
    console.log("DM1"+this.counter)
    if (this.counter < this.cardsList.length-1) {
      this.counter++;
      this.ShowOneCard();
    }
    else if (this.counter === this.cardsList.length-1){
      this.accept();
      this.counter=0;
      this.ShowOneCard();
    }
    else{
      this.counter=0;
      this.ShowOneCard();
    }
    console.log("DM2"+this.counter)
  }

  public ageFromDateOfBirthday(dateOfBirth: any): number{
    var date = moment(dateOfBirth, "YYYY-MM-DD")
    console.log(date)
    return moment().diff(date, 'years');
    }

  async accept(){
    const alert = await this.alertController.create({
      header: 'Submit alert',
      message: 'There are no no possible matches',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    

    await alert.present();
  }
  async nomatches(){
    const alert = await this.alertController.create({
      header: 'Submit alert',
      message: 'First you need to select one or more tags',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    

    await alert.present();
  }

}