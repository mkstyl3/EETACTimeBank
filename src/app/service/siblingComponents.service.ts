import { Injectable } from '@angular/core';

@Injectable()
export class SiblingComponentsService {
  // Servei per compartir dades entre dos components "Siblings"

  private activity: any;

  publishActivity(data: any) {
    this.activity = data;
  }
  subscribeActivity() {
    return this.activity;
  }
}
