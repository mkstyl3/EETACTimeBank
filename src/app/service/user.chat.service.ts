import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';
import {Observable} from 'rxjs/Observable';
import {Chat} from '../models/chat/chat';

const url = 'chats';

@Injectable()
export class UserChatService {
  currentChat;

  constructor(private http: HttpClient) {
    }

  public getUserChats() {
    return this.http.get<any>(url);
  }
 public getUserChat(userId): Observable<Chat> {
        return this.http.get<any>(url+'/5ae73f594c557a1934b87263');
  }
}
