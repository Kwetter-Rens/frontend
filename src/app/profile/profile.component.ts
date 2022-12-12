import { Component, OnInit } from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileService} from "../__services/profile/profile.service";
import {Tweet} from "../__interfaces/tweet";
import {Profile} from "../__interfaces/profile";
import {fakeAsync} from "@angular/core/testing";
import {RelationService} from "../__services/relation/relation.service";
import {Relation} from "../__interfaces/relation";
import {SessionStorageService} from "ngx-webstorage";
import {Observable} from "rxjs";
import {UserService} from "../__services/user/user.service";
import {TweetService} from "../__services/tweet/tweet.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: Profile;
  profileNotFound = false;
  currentAuthUser: any;
  following: any;
  isFollowing: Boolean;

  constructor(
    private sessionSt: SessionStorageService,
    private router: Router,
    private route: ActivatedRoute,
    public auth: AuthService,
    private profileService: ProfileService,
    private relationService: RelationService,
    private userService: UserService,
    private tweetService: TweetService
  ) { }

  ngOnInit(): void {
    this.getProfileName();
    this.getCurrentUser();
  }

  private getProfileName() {
    this.route.params.subscribe(params => {
      this.getProfile(params['profilename']);
    })
  }

  getFollowing() {
    this.relationService.getRelationsByCurrentUserId(this.currentAuthUser.sub).subscribe(
      (Response: string[]) => {
        this.following = Response;
        // @ts-ignore
        if(this.profile.userId !== undefined) {
          // @ts-ignore
          this.isFollowingUser(this.profile.userId)
        }
      }
    );
  }

  private getProfile(_profilename: any) {
    this.profileService.getProfileWithRelationById(_profilename).subscribe(
      (Response: Profile) =>
      {
        this.profile = Response;

        if(this.profile == undefined) {
          this.profileNotFound = true;
          return;
        }
        console.log('profileId: ' + this.profile?.userId)
        if(this.currentAuthUser !== undefined) {
          this.isFollowingUser(this.profile.userId)
        }
      }, error => {
        console.log(error)
        this.handleError(error);
      }
    );
  }

  private handleError (error: Response | any) {
//Your other codes
    console.log(error)
    if (error.status == 0){ //or whatever condition you like to put
      this.router.navigate(['/error']);
    }
  }

  private getCurrentUser() {
    this.auth.user$.subscribe(
      (profile) => {
        (this.currentAuthUser = JSON.parse(JSON.stringify(profile, null, 2)));
        console.log('userId: ' + this.currentAuthUser.sub)
        this.getFollowing()
    });
  }

  followProfile() {
    // @ts-ignore
    this.relationService.createRelation(new Relation(this.currentAuthUser.sub, this.profile.userId))
    this.isFollowing = true;
  }

  private isFollowingUser(userId: string) {
    this.isFollowing = (this.following.indexOf(userId) !== -1)
    console.log("isFollowing: " + this.isFollowing)
  }

  unfollowProfile() {
    // @ts-ignore
    this.relationService.deleteRelation(this.currentAuthUser.sub, this.profile.userId)
    this.isFollowing = false;
  }

  deleteProfile() {
    if (confirm("Are you sure to delete " + this.profile.username + "?")) {
      this.tweetService.deleteUserFromTweets(this.profile.userId);
      // this.userService.deleteUser(this.profile.userId);
      this.profileService.deleteProfile(this.profile.userId);
      this.auth.logout();
    }
  }
}
