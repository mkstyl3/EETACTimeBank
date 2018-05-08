export class Activity {
  constructor (
    name: string,
    latitude: number,
    longitude: number,
    cost: number,
    user: string,
    description: string,
    imatge: string,
    date: string,
    tag: string[],
    category: string[]

  ) {
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
    this.cost = cost;
    this.user = user;
    this.description = description;
    this.imatge = imatge;
    this.date = date;
    this.tag = tag;
    this.category = category;
  }
  name: string;
  latitude: number;
  longitude: number;
  cost: number;
  user: string;
  description: string;
  imatge: string;
  date: string;
  tag: string[];
  category: string[];
}
