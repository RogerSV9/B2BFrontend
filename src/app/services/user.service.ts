import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';
import {HttpClient} from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  environment: EnvironmentService;
  user: User[];
  selectedUser: User;

  constructor(private http: HttpClient) {
    this.selectedUser = new User();
    this.environment = new EnvironmentService();
  }

  signin(user: User)  {
    return this.http.post(this.environment.urlUser + '/signInUser', user);
   }
   signup(user: User) {
    return this.http.post(this.environment.urlUser + '/register', user);
  }
  getUsers() {
    return this.http.get(this.environment.urlUser + '/users');
  }
}
