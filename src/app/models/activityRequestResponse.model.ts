import {User} from './user.model';
import {Activity} from './activity.model';

export class ActivityRequestResponse {
  constructor (
    userFrom  :      User,
    userTo    :      User,
    activity  :      Activity,
    isDone    :      boolean,
    accepted  :      boolean,
    date      :      Date

  ){}
}
