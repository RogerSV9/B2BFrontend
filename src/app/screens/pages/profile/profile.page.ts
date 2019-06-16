import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { ImageService } from "../../../services/image.service";
import { User } from "../../../models/user";
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Rating } from '@mobiscroll/angular/src/js/classes/rating';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
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
export class ProfilePage implements OnInit{

  user: User;
  selectedFile: ImageSnippet;
  age: number;
  currentRate: number;
  eventslist: User;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private imageService: ImageService) { 
    this.user = new User();
    this.eventslist = new User();
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(params =>{
      if (typeof params ['id'] !== 'undefined'){
        this.user._id = params['id'];
      }
      else{
        this.user._id = '';
      }
    });
    this.user._id = localStorage.getItem('id')
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

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
      this.imageService.uploadImage(this.selectedFile.file, this.user._id).subscribe(
        (res) => {
          console.log(res)
          //window.location.reload()
        },
        (err) => {
          console.log(err)
          //window.location.reload()
        })
    });
    reader.readAsDataURL(file);
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
    let id = localStorage.getItem('id')
    this.userService.getUsersevents(id)
    .subscribe(res =>{
      this.eventslist = res;
    });
  }

  ionViewWillEnter(){
      this.user._id = localStorage.getItem('id')
      this.getUserDetail(this.user._id);
  }

  ionViewDidLoad(){
      this.user._id = localStorage.getItem('id')
      this.getUserDetail(this.user._id);
  }

  ionViewDidEnter(){
      this.user._id = localStorage.getItem('id')
      this.getUserDetail(this.user._id);
  }

  refresh(){
    window.location.reload()
  }
}
