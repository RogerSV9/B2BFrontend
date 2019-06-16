import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event';

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
              private eventService: EventService) { }


  toNeweventPage() {
    this.router.navigate(['newevent']);
  }

  ngOnInit() {
    this.getEvents();
    this.setFilteredItems();
  }

  getEvents(){
    this.eventService.getEvents()
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
