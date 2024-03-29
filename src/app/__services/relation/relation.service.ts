import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";
import {Relation} from "../../__interfaces/relation";

const baseUrl = 'http://localhost:8080/api/v1/relation';

@Injectable({
  providedIn: 'root'
})
export class RelationService {

  constructor(private http: HttpClient) { }

  createRelation(relation: Relation): Subscription {
    return this.http.post(baseUrl, {...relation}).subscribe(r => {});
  }

  getRelationsByCurrentUserId(userId: String): Observable<any> {
    return this.http.get(baseUrl + '/' + userId)
  }

  deleteRelation(currentUserId: string, profileUserId: string) {
    console.log("deleting relationship of " + currentUserId + " and " + profileUserId)
    return this.http.delete(baseUrl + '/' + currentUserId + '/' + profileUserId).subscribe()
  }

  private getHttpOptions() {
    const jwtToken = localStorage.getItem("token");
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwtToken
      })
    };
  }
}
