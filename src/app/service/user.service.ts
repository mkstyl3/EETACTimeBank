import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user.model';
import {Login} from '../models/login.model';
import {Observable} from 'rxjs/Observable';

const url = 'http://localhost:3000/user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  test$(){
    return this.http.get(url + '/test');
  }

  signIn$(username: string, password: string): Observable<Login> {
    return this.http.post<Login>(url + '/signIn', new Login(null,null, {username, password}, null, null));
  }

  insert$(user: User) {
    console.log(user);
    return this.http.post(url + '/insert', user);
  }





}
