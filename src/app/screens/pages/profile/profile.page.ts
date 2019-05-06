import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { ImageService } from "../../../services/image.service";
import { User } from "../../../models/user";
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User;
  selectedFile: ImageSnippet;
  age: number;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private imageService: ImageService) { 
    this.user= new User();
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
    this.user._id = "5caf128799d1b20ba9d761e2"
    this.getUserDetail(this.user._id);

  }
  getUserDetail(_id: string){
    this.userService.getUsersDetail(_id)
    .subscribe(res =>{
      this.user = res;
      this.age = this.ageFromDateOfBirthday(this.user.age)
      console.log(this.user) 
    });
  }
  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    this.imageService.passid(this.user._id)
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
      this.imageService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
          this.onSuccess();
          console.log(res)
        },
        (err) => {
          this.onError();
          console.log(err)
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
}
