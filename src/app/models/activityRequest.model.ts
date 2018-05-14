

export class ActivityRequest {
  constructor (
    userFrom  :      string,
    userTo    :      string,
    activity  :      string,
    isDone    :      boolean,
    accepted  :      boolean,
    date      :      string

  ){
    this.userFrom =   userFrom;
    this.userTo =     userTo;
    this.activity =   activity;
    this.isDone =     isDone;
    this.accepted =   accepted;
    this.date =       date;
  }
  userFrom: string;
  userTo:   string;
  activity; string;
  isDone:   boolean;
  accepted: boolean;
  date:     string;

}
