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
  eventsList: Event[] = []
  constructor(private router: Router,
              private eventService: EventService) { }


  toNeweventPage() {
    this.router.navigate(['newevent']);
  }

  ngOnInit() {
    console.log("ngOnInit")
    this.getEvents()
    console.log("ngOnInit2")
  }

  getEvents(){
    this.eventService.getEvents()
      .subscribe(res => {
        this.eventsList = res;
        console.log(res)
        console.log("GET EVENTS")
      })
  }

}
