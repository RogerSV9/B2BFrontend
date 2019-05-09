import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { passValidator } from './validator';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  myGroup: FormGroup;
  validation_messages: any;
  matching_passwords_group: FormGroup;
  myDate: any ;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder, public navCtrl: NavController) {
    this.myDate = "2020-12-01";
  /*   this.registerForm = this.createMyForm(); */
 
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/.{3,10}$/)])),

      username: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/.{3,10}$/)])),
    
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)])),
        
        /* age: new FormControl('', Validators.compose([
          Validators.required])), */

        firstName: new FormControl(),

      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^(?=.*\d).{4,8}$/)])),

      confirmPassword: ['', passValidator]
    }
  );
  }
  confirmPasswword: string;

  ngOnInit() {
    this.validation_messages = {
      'name': [
        { type: 'required', message: 'Name is required'},
        { type: 'pattern', message: 'It has to be between 3 and 10 characters long'}
      ],
      'username': [
        { type: 'required', message: 'Name is required'},
        { type: 'pattern', message: 'It has to be between 3 and 10 characters long'}
      ],
      'email': [
        { type: 'required', message: 'Email is required' },
        { type: 'unique', message: 'Email must be unique'} ,
        { type: 'pattern', message: 'It must be valid. Must contain a @ and only one dot in the domain. Domain between 2 and 3 characters long' }
      ],
      'age': [
        { type: 'required', message: 'Age is required'}
      ],
      'password': [
        { type: 'required', message: 'Password is required' },
        { type: 'pattern', message: 'It must be valid. Must contain at least one number and must be between 4 and 8 characters' }
      ],
      'confirmPassword': [
        { type: 'required', message: 'Password is required and both must match' },
        { type: 'pattern', message: 'It must be valid. Must contain at least one number and must be between 4 and 8 characters' }
      ]
    };
  }

  register() {
    let user = new User(null, this.registerForm.value.name, null, this.registerForm.value.username,this.registerForm.value.email, this.registerForm.value.age, null, null, this.registerForm.value.password, this.registerForm.value.confirmPassword);
    console.log(user);
    this.userService.signup(user)
      .subscribe(
        res => {
          console.log(res);
          let token = res['token'];
          localStorage.setItem('token', token);
          this.router.navigateByUrl('/login');
        },
        err => {
          this.registerForm.get('email').setErrors({unique: true});
        });
  }
  private createMyForm(){
    return this.formBuilder.group({
      name: ['', Validators.required]
  })
}

}
