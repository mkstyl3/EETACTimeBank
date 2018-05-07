export class User {
  constructor(userId: string, userName: string, userAvatar: string) {
    this.userId = userId;
    this.userName = userName;
    this.userAvatar = userAvatar;

  }
  userId: string;
  userName: string;
  userAvatar: string;
}
