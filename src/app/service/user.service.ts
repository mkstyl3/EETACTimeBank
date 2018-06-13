import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from '../../../node_modules/rxjs';
import {ActivityRequest} from '../models/activityRequest.model';

const url = 'users';

@Injectable()
export class UserService {

  public token: any;
  public user;
  constructor(private http: HttpClient) { }

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

  getProfileUser$(name: string) {
    return this.http.get<User>(url + '/' + name);
  }

  updateProfileUser$(name: string, body: any) {
    return this.http.put<any>(url + '/' + name, body);
  }

  googleCode$(code): Observable<any> {
    this.token = this.http.post(url + '/oauth/google/code', code);
    return this.token;
  }

  googleOAuthInitService$(): Observable<any> {
    return this.http
      .get<any>(url + '/signin/google/code');
  }

  googleToken$(access_token): any {
    this.user = this.http.post(url + '/oauth/google/token', {access_token});
    return this.user;
  }
  addchat$(json: any) {
    return this.http.post<any>('chats/add', json);
  }

  fileUpdate(file: File) {
    const req = new HttpRequest('POST', '/file', file, {
      reportProgress: true
    });
    return this.http.request(req);
  }
}
