import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  environment: EnvironmentService;

  constructor(private http: HttpClient) { 
    this.environment = new EnvironmentService();
  }

  public uploadImage(image: File): Observable<any> {
    const formData = new FormData();

    formData.append('imgUploader', image);

    return this.http.post(this.environment.urlUser+'/uploadimage', formData);
  }
}
