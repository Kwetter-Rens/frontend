export class Profile {
  profileId: number;
  userId: string;
  username: string;
  userPicture: string;
  bio: string;
  userEmail: string;
  dateOfBirth: Date;
  followingUserIds: string[];


  constructor(profileId: number, userId: string, username: string, userPicture: string, bio: string, userEmail: string, dateOfBirth: Date, following: string[]) {
    this.profileId = profileId;
    this.userId = userId;
    this.username = username;
    this.userPicture = userPicture;
    this.bio = bio;
    this.userEmail = userEmail;
    this.dateOfBirth = dateOfBirth;
    this.followingUserIds = following;
  }
}
