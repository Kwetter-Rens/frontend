import {Component, Input, OnInit} from '@angular/core';
import { Tweet } from '../interfaces/tweet';
import {HttpClient} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {TweetService} from "../__services/tweet/tweet.service";
import {UserService} from "../__services/user/user.service";
import {User} from "@auth0/auth0-angular";
import {Router} from "@angular/router";
import {Profile} from "../interfaces/profile";

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {
  @Input()
  profile: Profile;

  public tweets: Tweet[] = []

  constructor(private http: HttpClient, private tweetService: TweetService, private userService: UserService, public router: Router) {
  }

  ngOnInit(): void {
    this.getTweetsOfUsers(this.profile.followingUserIds)
  }

  public getTweetsOfUsers(followingIds: string[]) {
    if(followingIds.length != 0) {
      this.tweetService.getTweetsOfUsers(followingIds).subscribe(
        (Response: Tweet[]) => {
          this.tweets = Response
        }
      );
    }
  }
}
