import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';
import {Observable} from 'rxjs/Observable';

const url = 'chats';

@Injectable()
export class UserChatService {
  currentChat: Observable<Array<object>>;

  constructor(private http: HttpClient) {
  }

  public getUserChats() {
    return this.http.get<any>(url);
  }

  public getUserChat(userId) {
    return this.http.get<any>(`url/$userId`).subscribe(chat => {
      this.currentChat = chat;
    });
  }
}
