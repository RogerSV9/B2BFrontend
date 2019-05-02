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

  constructor(private http: HttpClient) { 
    this.environment = new EnvironmentService();
  }
  getUsers(){
    return this.http.get(this.environment.urlUser + "/users")
  }
  getUsersDetail(_id: string): Observable<User>{
    return this.http.get<User>(this.environment.urlUser +`/users/info/${_id}`);
  }
}