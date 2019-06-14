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
  selectedUser: User;
  socket: SocketIOClient.Socket;

  constructor(private http: HttpClient) {
    this.selectedUser = new User();
    this.environment = new EnvironmentService();
  }

  getsocket(){
    return this.socket;
  }
  postsocket(socket: SocketIOClient.Socket){
    this.socket=socket;
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
    return this.http.put(this.environment.urlUser + '/users', user)
  }

}
