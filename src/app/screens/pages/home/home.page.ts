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

  constructor(private userService: UserService, private router: Router, private activatedRouter: ActivatedRoute) { 
    this.user= new User();
      
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
      console.log(res);
    });
  }


}
