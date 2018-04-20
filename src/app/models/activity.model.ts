export class Activity {
  constructor (
    name: string,      // Campo obligatório para insertar
    latitude: number,        // Campo obligatório para insertar
    longitude: number,        // Campo obligatório para insertar
    cost: number,        // Campo obligatório para insertar
    user1: string,       // Campo obligatório para insertar
    user2: string,
    description: string,
    tags: Array<string>,
    date: Date,
    isDone: Boolean
  ){}
}