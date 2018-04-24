import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';


declare var moment: any;


const url = 'http://localhost:3000/users';

@Injectable()
export class UserService {
  private isUserLoggedIn;

  constructor(private http: HttpClient) {
    this.isUserLoggedIn = false;
  }

  setUserLoggedIn() {
    this.isUserLoggedIn = true;
  }

  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }

  test$(){
    return this.http.get(url + '/test');
  }

  signIn$(username: string, password: string): Observable<any> {
    return this.http.post<any>(url + '/signin', { username, password });
  }

  signUp$(userData: any) {
    console.log(userData);
    return this.http.post<any>(url + '/signup', userData);
  }
}
