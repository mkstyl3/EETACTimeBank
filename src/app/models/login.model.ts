import {User} from './user.model';

export class Login {
  constructor (
    public requestId: number,
    public responseId: number,
    public request: {username: string, password: string},
    public response: string,
    public user: User
  ){}
}
