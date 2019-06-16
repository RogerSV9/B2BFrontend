import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  environment: EnvironmentService
  selectedEvent: Event
  events: Event[]

  constructor(private http: HttpClient) {
    this.selectedEvent = new Event()
    this.environment = new EnvironmentService()
   }

    //POST
    addevent(event: Event) {
      return this.http.post(this.environment.urlUser + '/events', event);
    }
  
    //GET
    getEvents(_id: string): Observable<Event[]> {
      console.log("Get events")
      return this.http.post<Event[]>(this.environment.urlUser + '/getevents', _id);
    }
  
    //DELETE
    deleteEvents(_id: string) {
      return this.http.delete(this.environment.urlUser + `/events/${_id}`);
    }
}
