import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private router: Router){ }
  toChatPage() {
    this.router.navigate(['chat']);
  }

  toEventsPage() {
    this.router.navigate(['events']);
  }

  toHomePage() {
    this.router.navigate(['home']);
  }

  toProfilePage() {
    this.router.navigate(['profile']);
  }

  toEditprofilePage(){
    this.router.navigate(['editprofile'])
  }

  toNeweventsPage(){
    this.router.navigate(['newevents'])
  }

  ngOnInit() {
  }

}
