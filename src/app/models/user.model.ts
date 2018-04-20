export class User {
  constructor(
    public username: string,
    public name: string,
    public mail: string,
    public password: string,
    public image: string,
    public description: string,
    public tags: string[],
    public wallet: number,
    public rating: number,
    public numVal: number,
    public offered: string[],
    public received: string[]
  ) {}
}
