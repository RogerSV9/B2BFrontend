import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { User } from "../../../models/user";
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Rating } from '@mobiscroll/angular/src/js/classes/rating';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
  styles: [`
    .star {
      position: relative;
      display: inline-block;
      font-size: 3rem;
      color: #d3d3d3;
    }
    .full {
      color: red;
    }
    .half {
      position: absolute;
      display: inline-block;
      overflow: hidden;
      color: red;
    }
  `]
})
export class UserprofilePage implements OnInit {

  user: User;
  age: number;
  currentRate: number;
  eventslist: User;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {
    this.user = new User();
    this.eventslist = new User();
   }

  ngOnInit() {
    this.user._id = localStorage.getItem('destid')
    this.getUserDetail(this.user._id);
    this.geteventsuser();
  }
  getUserDetail(_id: string){
    this.userService.getUsersDetail(_id)
    .subscribe(res =>{
      this.user = res;
      this.age = this.ageFromDateOfBirthday(this.user.age)
      this.currentRate = this.getaveragerating(this.user.ratings)
      console.log(this.user.ratings)
      console.log(this.user) 
    });
  }

  public ageFromDateOfBirthday(dateOfBirth: any): number{
    var date = moment(dateOfBirth, "YYYY-MM-DD")
    console.log(date)
    return moment().diff(date, 'years');
    //return moment(dateOfBirth, 'years').fromNow()
  }

  getaveragerating(ratings: number[]){
    /*let sum = ratings.reduce((previous, current) => current += previous);
    let avg = sum / ratings.length;
    console.log("AVG",avg)*/
    let sum = 0;
    for (let i = 0; i < ratings.length; i++){
      sum = sum + ratings[i]
    }
    let avg = sum/ratings.length
    console.log(avg)
    return avg;
  }

  geteventsuser(){
    let id = localStorage.getItem('destid')
    this.userService.getUsersevents(id)
    .subscribe(res =>{
      this.eventslist = res;
    });
  }

  ionViewWillEnter(){
      this.user._id = localStorage.getItem('destid')
      this.getUserDetail(this.user._id);
  }

  ionViewDidLoad(){
      this.user._id = localStorage.getItem('destid')
      this.getUserDetail(this.user._id);
  }

  ionViewDidEnter(){
      this.user._id = localStorage.getItem('destid')
      this.getUserDetail(this.user._id);
  }


}
