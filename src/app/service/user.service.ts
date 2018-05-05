import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from '../../../node_modules/rxjs';
import {ActivityRequest} from '../models/activityRequest.model';

const url = 'users';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  test$() {
    return this.http.get(url + '/test');
  }

  signIn$(username: string, password: string): Observable<any> {
    return this.http.post<any>(url + '/signin', { username, password });
  }

  signUp$(userData: any) {
    console.log(userData);
    return this.http.post<any>(url + '/signup', userData);
  }

  getUserWallet(id: string): Observable<any> {
    return this.http.post<any>(url + '/getUserById', { id });
  }
  // Peticiones Temporales Josean
  getPetitions(id) {
    return this.http.get('activityRequest/requested/' + id);
  }
  getTheirPetitions(id) {
    return this.http.get<any>('activityRequest/petitions/' + id);
  }
  // Peticiones Temporales Josean
}
