import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ThrowStmt } from '@angular/compiler';
import { stringify } from '@angular/core/src/util';

@Pipe({
  name: 'mapToIterable'
})
export class MapToIterable {
  transform(dict: Object): Array<any> {
    let a = [];
    for (let key in dict) {
      if (dict.hasOwnProperty(key)) {
        a.push({key: key, val: dict[key]});
      }
    }
    return a;
  }
}


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})

export class EditprofilePage implements OnInit {

  user: User;
  modifieduser: User;
  newtag: string;

  constructor(private userService: UserService, private router: Router, public alertController: AlertController) { 
    this.user = new User();
    this.modifieduser = new User();
    this.newtag = "";
  }

  ngOnInit() {
    this.user._id = localStorage.getItem('id');
    this.getUserDetail(this.user._id);
  }

  getUserDetail(_id: string){
    this.userService.getUsersDetail(_id)
    .subscribe(res =>{
      this.user = res;
      this.modifieduser = res;
    });
  }

  async cancel(){
    this.router.navigateByUrl('/menu/profile');
  }

  async accept(){
      const alert = await this.alertController.create({
        header: 'Submit alert',
        message: 'Do you want to continue?',
        buttons: [
          {
            text: 'Back',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Submit',
            handler: () => {
              console.log('Confirm Okay');
              let bool = false
              //console.log(this.modifieduser)
              this.userService.UpdateUser(this.modifieduser)
              .subscribe(res =>{
                console.log("RES",res)
                bool = true
              })
              console.log("Updated")
              if(bool = true)
              this.router.navigateByUrl('/menu/profile');
              //window.location.reload()
            }
          }
        ]
      });
      await alert.present();
    }
    deletetag(i: number){
      this.modifieduser.tag.splice(i,1)
      console.log(this.modifieduser.tag)
      this.userService.UpdateUser(this.modifieduser)
      .subscribe(res =>{
        console.log("RES",res)
      })
    }
    createtag(newtag: string){
      this.modifieduser.tag.push(newtag)
      console.log(this.modifieduser.tag)
      this.userService.UpdateUser(this.modifieduser)
      .subscribe(res =>{
        console.log("RES",res)
      })
      this.newtag = ""
    }    
}
