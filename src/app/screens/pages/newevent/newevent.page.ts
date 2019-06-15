import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-newevent',
  templateUrl: './newevent.page.html',
  styleUrls: ['./newevent.page.scss'],
})
export class NeweventPage implements OnInit {

  eventForm: FormGroup;
  myGroup: FormGroup;
  event: Event;

  toEventsPage() {
    this.router.navigate(['/menu/events']);
  }

  constructor(private neweventService: EventService, 
              private router: Router,
              private formBuilder: FormBuilder, 
              public navCtrl: NavController) {

  this.eventForm = this.formBuilder.group({
    name: new FormControl(),
    description: new FormControl(),
    location: new FormControl(),
    date: new FormControl()
  })
               }

  ngOnInit() {
  }

  newevent() {
    console.log("hello")
    console.log(this.eventForm.value.name)
    let event = new Event( null,
                           this.eventForm.value.name,
                           this.eventForm.value.date,
                           this.eventForm.value.location,
                           this.eventForm.value.description);
    console.log(event);
    this.neweventService.addevent(event)
    .subscribe(
      res => {
        console.log(res)
        console.log("Ha entrado")
        this.router.navigateByUrl('/menu/events')
      })
  }

  onSubmit(){
    console.log(this.event)
  }



}
