import { Component, OnInit } from '@angular/core';
import { UserService} from '../../services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm  } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { HttpErrorResponse } from '@angular/common/http';
declare var FB: any;



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [UserService],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  validation_messages: any;
  user: User;

  constructor(private userService: UserService, private router: Router,  private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/.{3,10}$/)])),

      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^(?=.*\d).{4,8}$/)]))
    } );
  }

  ngOnInit() {
    this.validation_messages = {
      'username': [
        { type: 'required', message: 'Username is required' },
        { type: 'pattern', message: 'Username must be unic' },
        { type: 'pattern', message: 'Username must be admin' }
      ],
      'password': [
        { type: 'required', message: 'Password is required' },
        { type: 'pattern', message: 'It must be valid' },
        { type: 'pattern', message: 'It must conatain a number' },
      ]
    };
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '2275019405888323',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.2'
      });
      FB.AppEvents.logPageView();
    };
    

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }

  login(form) {
      console.log(form.value.username);
      console.log('Form:' + form.value);
      let user = new User(null, null, null, form.value.username, null, null, null, null, form.value.password, null);
      console.log('user' + user);
      this.userService.signin(user)
        .subscribe(
          res => {
            console.log(res);
            let token = res['token'];
            localStorage.setItem('token', token);
            user = res['username'];
            localStorage.setItem('id', user._id);
            this.router.navigateByUrl('/menu/home');
            
          },
          err => {
            console.log(err);
            this.handleError(err);
          });
    }
    submitLogin(){
      console.log("submit login to facebook");
        FB.login((response)=>
          {
            console.log("hola");
            console.log('submitLogin',response);
            if (response.authResponse)
            {
              console.log(response.authResponse);
              
              let clientID: string = response.authResponse.userID;
              console.log(clientID);
              
              FB.api(
                "/"+clientID+"/music",
                function (response) {
                  if (response && !response.error) {
                    console.log(response);
                  }
                }
              );
              /* let token = res['token'];
              localStorage.setItem('token', token); */
              this.router.navigateByUrl('/home');
              
             }
             else
             {
             console.log('User login failed');
           }
        });
  }
private handleError(err: HttpErrorResponse) {
if (err.status == 500) {
  console.log('entra')
  confirm('User incorrect');
  this.loginForm.get('password').setErrors({error: true});
} else if (err.status == 404) {
  console.log('entrada');
  confirm('Password incorrect');
  this.loginForm.get('password').setErrors({valid: true});
}
else if  (err.status == 401) {
  console.log('salida');
  confirm('Unauthorized');
  this.loginForm.get('username').setErrors({valid: true});
}
}

}
