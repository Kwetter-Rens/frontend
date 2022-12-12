import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const baseUrl = 'http://localhost:8080/api/v1/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) { }

  getProfileWithRelationById(id: string): Observable<any> {
    return this.http.get(baseUrl + '/' + id);
  }

  deleteProfile(id: string) {
    return this.http.put(baseUrl + '/' + id, {}).subscribe();
  }
  getLambdaResponse() {
    return this.http.get('https://exleecfmqh53hcxioii3zkykbu0btmte.lambda-url.eu-west-1.on.aws/');
  }

}
