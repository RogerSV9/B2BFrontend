import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';
import {HttpClient} from "@angular/common/http";
import { User } from "../models/user";
import { Observable } from 'rxjs';

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
  getUsersDetail(_id: string): Observable<User>{
    return this.http.get<User>(this.environment.urlUser +`/users/info/${_id}`);
  }
  UsersList(_id: string){
    return this.http.post(this.environment.urlUser +'/availablematches/', {"_id": _id});
  }
  acceptMatch(userSourceId: string, userDestId: string) {
    return this.http.post(this.environment.urlUser + '/acceptmatch', {"userSourceId": userSourceId, "userDestId": userDestId});
  }
  UpdateUser(user: User){
    return this.http.put(this.environment.urlUser + '/users', user)
  }

}
