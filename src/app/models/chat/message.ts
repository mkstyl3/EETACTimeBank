 export class Message {
  constructor(userFrom: string, text: string, date: Date, readIt: boolean, id, error = false) {
    this.id = id;
    this.userFrom = userFrom;
    this.text = text;
    this.date = date;
    this.readIt = readIt;
    this.error = error;
  }
   id: string;
   userFrom: string;
   text: string;
   date: Date;
   readIt: boolean;
   error: boolean;
 }
