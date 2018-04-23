import {User} from './user.model';

export class Login {
  constructor (token: string, response: string) {this.token = token; }
  token: string;
  response: string;
}
