import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {

  user: User;
  modifieduser: User;

  constructor(private userService: UserService, private router: Router, public alertController: AlertController) { 
    this.user = new User();
    this.modifieduser = new User();
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
    this.router.navigateByUrl('/profile');
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
              //console.log(this.modifieduser)
              this.userService.UpdateUser(this.modifieduser)
              .subscribe(res =>{
                console.log("RES",res)
              })
              console.log("Updated")
              this.router.navigateByUrl('/profile');
              window.location.reload()
            }
          }
        ]
      });
  
      await alert.present();
    }


}
