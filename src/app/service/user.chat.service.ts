import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Chat} from '../models/chat/chat';
import {Message} from '../models/chat/message';

const url = 'chats';

@Injectable()
export class UserChatService {
  currentChat = new BehaviorSubject(null);
  newMessage = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  public getUserChats() {
    return this.http.get<any>(url);
  }

  public getUserChat(chatId): Observable<Chat> {
    return this.http.get<any>(url + '/' + chatId);
  }

  public setCurrentChat(chatId): BehaviorSubject<Chat> {
    this.currentChat.next(chatId);
    return chatId;
  }

  public sendMessage(message): BehaviorSubject<Chat> {
    const messageToSend = new Message(this.currentChat.getValue(), message, new Date(), false);
    this.newMessage.next(messageToSend);
    return message;
  }
}
