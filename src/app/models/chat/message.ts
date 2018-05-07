 export class Message {
  constructor(userFrom: string, text: string, date: Date, readIt: boolean) {
    this.userFrom = userFrom;
    this.text = text;
    this.date = date;
    this.readIt = readIt;
  }
   userFrom: string;
   text: string;
   date: Date;
   readIt: boolean;
 }
