import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

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

  constructor(private userService: UserService, 
              private router: Router, 
              private activatedRouter: ActivatedRoute) { 
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
    let user = new User(data, null, null,null, null, null, null, null, null, null);
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

  /* for (let i in this.cardsList){
    this.onecard = this.cardsList[i];
    console.log(this.onecard)
  } */
  }


  acceptMatch(userDestId: string){

    let userSourceId = localStorage.getItem('id');  
    console.log("Source"+userSourceId)
    console.log("Dest"+userDestId)  
    this.userService.acceptMatch(userSourceId, userDestId)
    .subscribe(res => {
      if (this.counter < this.cardsList.length-1) {
        this.counter++;
        this.ShowOneCard();
      }
      else {
        this.counter=0;
        this.ShowOneCard();
      }  
      console.log(res)
    });
  }

  discardMatch(){
    //console.log("DM1"+this.counter)
    if (this.counter < this.cardsList.length-1) {
      this.counter++;
      this.ShowOneCard();
    }
    else {
      this.counter=0;
      this.ShowOneCard();
    }   
    //console.log("DM2"+this.counter)
  }
}