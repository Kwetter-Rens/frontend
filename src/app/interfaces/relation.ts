export class Relation {
  userId: String;
  followingUserId: String;


  constructor(userId: String, followingProfileId: String) {
    this.userId = userId;
    this.followingUserId = followingProfileId;
  }
}
