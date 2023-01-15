import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "@auth0/auth0-angular";
import {Tweet} from "../__interfaces/tweet";
import {HttpClient} from "@angular/common/http";
import {TweetService} from "../__services/tweet/tweet.service";
import {TweetsComponent} from "../tweets/tweets.component";
import {RelationService} from "../__services/relation/relation.service";
import {SessionStorageService} from "ngx-webstorage";
import {Profile} from "../__interfaces/profile";
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
  @ViewChild(TweetsComponent) tweetsComponent:TweetsComponent;

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
        this.getProfileByAuth0Id(this.authUser.sub);
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
    let newTweet = new Tweet(new Date(), this.tweetText, this.authUser.sub, this.authUser.sub, "https://i1.wp.com/cdn.auth0.com/avatars/ad.png?ssl=1");
    this.tweetService.postTweet(newTweet);
    this.tweetText = "";
    this.tweetsComponent.tweets.push(newTweet);
    //window.location.reload()
  }

  private getProfileByAuth0Id(Auth0Id: string) {
    this.profileService.getProfileWithRelationById(Auth0Id).subscribe(
      (response: Profile) => {
        console.log("Profile: ");
        console.log(response)
        this.profile = response;
        this.profile.followingUserIds.push(this.authUser.sub);
      }
    )
  }
}
