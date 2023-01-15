import { Injectable } from '@angular/core';
import {catchError} from "rxjs/operators";
import {Observable, Subscription, throwError} from "rxjs";
import {Tweet} from "../../__interfaces/tweet";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";

const baseUrl = 'http://localhost:8080/api/v1/tweet';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(private http: HttpClient) { }

  getTweets(): Observable<any> {
    return this.http.get(baseUrl);
  }

  postTweet(tweet: Tweet): Subscription {
    const httpOptions = this.getHttpOptions();
    console.log(tweet)
    return this.http.post(baseUrl, {...tweet}, httpOptions).subscribe(r => {});
  }

  getTweetsOfUsers(userIds: String[]): Observable<any> {
    return this.http.get(baseUrl + '/gettweets/' + userIds)
  }

  deleteUserFromTweets(userId: string) {
    const httpOptions = this.getHttpOptions();
    return this.http.put(baseUrl + "/" + userId, {}, httpOptions).subscribe()
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

