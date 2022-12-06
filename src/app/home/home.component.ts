import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "@auth0/auth0-angular";
import {Tweet} from "../interfaces/tweet";
import {HttpClient} from "@angular/common/http";
import {TweetService} from "../__services/tweet/tweet.service";
import {TweetsComponent} from "../tweets/tweets.component";
import {RelationService} from "../__services/relation/relation.service";
import {SessionStorageService} from "ngx-webstorage";
import {Profile} from "../interfaces/profile";
import {ProfileService} from "../__services/profile/profile.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tweetText = "";
  authUser: any;
  profile: Profile;
  lambdaResponse: any;

  constructor(
    private sessionSt: SessionStorageService,
    public route: Router,
    public auth: AuthService,
    private tweetService: TweetService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => {(this.authUser = JSON.parse(JSON.stringify(profile, null, 2)))
        this.getProfile(this.authUser.nickname);
      });
    this.getLambdaResponse();
  }

  getLambdaResponse() {
    this.profileService.getLambdaResponse().subscribe(
      (response) => {
        this.lambdaResponse = response;
      }
    )
  }

  postTweet() {
    let newTweet = new Tweet(this.authUser.sub, this.tweetText, new Date(), this.authUser.nickname, this.authUser.picture, this.authUser.username)
    this.tweetService.postTweet(newTweet);
    window.location.reload()
  }

  private getProfile(nickname: string) {
    this.profileService.getProfileWithRelationByName(nickname).subscribe(
      (response: Profile) => {
        console.log("Profile: ");
        console.log(response)
        this.profile = response;
        this.profile.followingUserIds.push(this.authUser.sub);

      }
    )
  }
}
