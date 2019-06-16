import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})


export class EventsPage implements OnInit {
  items: Event[];
  searchTerm: string = "";
  eventsList: Event[];
  constructor(private router: Router,
              private eventService: EventService,
              private userService: UserService) { }


  toNeweventPage() {
    this.router.navigate(['newevent']);
  }

 
 ngOnInit() {
    this.getEvents();
    this.setFilteredItems();
  }

  joinEvent(idEvent: string){
    let _id = localStorage.getItem('id')
    this.userService.postEventuser(_id, idEvent)
  }

  getEvents(){
    let userID = localStorage.getItem('id')
    console.log(userID)
    this.eventService.getEvents(userID)
      .subscribe(res => {
        this.eventsList = res;
        this.items = res;
      })
  }

  setFilteredItems() {
    this.eventsList = this.filterItems(this.searchTerm);
    console.log(this.eventsList)
  }

  filterItems(searchTerm) {
    if(this.items){
      return this.items.filter(function(event) {
        return event.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
      });
    }
  }

ionViewWillEnter(){
  this.getEvents();
  this.setFilteredItems();
}

ionViewDidLoad(){
  this.getEvents();
  this.setFilteredItems();
}

ionViewDidEnter(){
  this.getEvents();
  this.setFilteredItems();
}

}
