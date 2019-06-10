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

  constructor(private userService: UserService, private router: Router, private activatedRouter: ActivatedRoute) { 
    this.user= new User();
  }

  ngOnInit() {
    userid = this.user._id;
    this.UsersList();
  }

  goBack() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  UsersList(){
    let id = localStorage.getItem('id');
    this.userService.UsersList(id)
    .subscribe(res =>{
      this.userService.user= res as User[];
      console.log(res);
    });
  }

  acceptMatch(userDestId: string){

    let userSourceId = localStorage.getItem('id');  
    console.log("Source"+userSourceId)
    console.log("Dest"+userDestId)  
    this.userService.acceptMatch(userSourceId, userDestId)
    .subscribe(res => {
      console.log(res)
    });
  }
  


}