import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const baseUrl = 'http://localhost:8080/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfileWithRelationByName(name: string): Observable<any> {
    return this.http.get(baseUrl + '/' + name);
  }


  getLambdaResponse() {
    return this.http.get('https://exleecfmqh53hcxioii3zkykbu0btmte.lambda-url.eu-west-1.on.aws/');
  }
}
