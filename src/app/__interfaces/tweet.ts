// export class Tweet {
//   userId: string;
//   message: string;
//   timeSent: Date;
//   username: string;
//   userPicture: string;
//   userSlug: string;
//
//
//   constructor(userId: string, message: string, timeSent: Date, username: string, userPicture: string, userSlug: string) {
//     this.userId = userId;
//     this.message = message;
//     this.timeSent = timeSent;
//     this.username = username;
//     this.userPicture = userPicture;
//     this.userSlug = userSlug;
//   }
// }


export class Tweet {
  creationTime: Date;
  content: string;
  userId: string;
  username: string;
  userPicture: string;


  constructor(creationTime: Date, content: string, userId: string, username: string, userPicture: string) {
    this.creationTime = creationTime;
    this.content = content;
    this.userId = userId;
    this.username = username;
    this.userPicture = userPicture;
  }
}
