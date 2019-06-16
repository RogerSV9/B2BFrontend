import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';
import {HttpClient} from "@angular/common/http";
import { User } from "../models/user";
import { Observable } from 'rxjs';
import * as io from 'socket.io-client' ;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  environment: EnvironmentService;
  user: User[];
  event: Event[];
  selectedUser: User;
  public socket: SocketIOClient.Socket;
  public users: User;

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
  getUsers(){
    return this.http.get(this.environment.urlUser + '/users');
  }
  getUsersDetail(_id: string): Observable<User>{
    return this.http.get<User>(this.environment.urlUser +`/users/info/${_id}`);
  }
  UsersList(user: User): Observable<User[]>{
    return this.http.post<User[]>(this.environment.urlUser +'/availablematches/', user);
  }
  acceptMatch(userSourceId: string, userDestId: string) {
    return this.http.post(this.environment.urlUser + '/acceptmatch', {"userSourceId": userSourceId, "userDestId": userDestId});
  }
  UpdateUser(user: User){
    return this.http.put(this.environment.urlUser + '/users', user);
  }
  postEventuser(userid: string, eventid: string){
    return this.http.post(this.environment.urlUser + '/posteventuser', {"userid": userid, "eventid": eventid});
  }
  getUsersevents(_id: string): Observable<User> {
    return this.http.post<User>(this.environment.urlUser + '/getuserevents', {"_id": _id});
  }
  postrating(id: String, rating: number) {
    return this.http.post(this.environment.urlUser + '/postrating', {"id": id, "rating": rating});
  }
  getUserbyusername(username: String): Observable<User> {
    return this.http.get<User>(this.environment.urlUser + `/users/${username}`);
  }

}
