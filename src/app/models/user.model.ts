import {Activity} from './activity.model';

export class User {
  constructor(
    public username: string,
    public password: string,
    public name: string,
    public mail: string,
    public description: string,
    public tags: string[],
    public image: string,
    public wallet: number,
    public rating: number,
    public numVal: number,
    public offered: Set<Activity>,
    public received: Set<Activity>,
    public admin: Boolean
  ) {}
}

