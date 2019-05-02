import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';
import {HttpClient} from "@angular/common/http";
import { User } from "../models/user";

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
}