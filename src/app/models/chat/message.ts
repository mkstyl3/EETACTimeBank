 export class Message {
  constructor(userTo: string, text: string, date: Date, readIt: boolean) {
    this.userTo = userTo;
    this.text = text;
    this.date = date;
    this.readIt = readIt;
  }
   userTo: string;
   text: string;
   date: Date;
   readIt: boolean;
 }
