import {Activity} from './activity.model';

export class User {
  constructor(
    username: string,
    password: string,
    name: string,
    mail: string,
    description: string,
    tags: string[],
    image: string,
    wallet: number,
    rating: number,
    numVal: number,
    admin: boolean
  ) {
    this.username = username;
    this.password = password;
    this.name = name;
    this.mail = mail;
    this.description = description;
    this.tags = tags;
    this.image = image;
    this.wallet = wallet;
    this.rating = rating;
    this.numVal = numVal;
    this.admin = admin;
  }
  username: string;
  password: string;
  name: string;
  mail: string;
  description: string;
  tags: string[];
  image: string;
  wallet: number;
  rating: number;
  numVal: number;
  offered: Activity[];
  received: Activity[];
  favorite: Activity[];
  admin: boolean;
}
