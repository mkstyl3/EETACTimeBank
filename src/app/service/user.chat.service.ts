import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Chat} from '../models/chat/chat';
import {Message} from '../models/chat/message';
import * as io from 'socket.io-client';
import {messageTypes} from '../configs/enums_chat';
const url = 'chats';

@Injectable()
export class UserChatService {
  currentChat = new BehaviorSubject(null);
  newMessage = new BehaviorSubject(null);
  userChats = new BehaviorSubject(null);
  private socket;
  private url = 'http://localhost:8880';

  constructor(private http: HttpClient) {
  }

  /* CREATE A SOCKET CONNECTION */
  socketConnect() {
    this.socket = io(this.url);
    console.log(this.socket);
    return this.socket;
  }

  /* SEND A MESSAGE VIA SOCKET*/
  sendMessageSocket(messageType, message) {
    this.socket.emit(messageType, JSON.stringify(message));
    console.log(JSON.stringify(message));
  }
  /* GET A NEW MESSAGE*/
  getPrivateMessage() {
    const observable = new Observable<Message>(observer => {
      this.socket.on(messageTypes.NEW_MESSAGE, (data) => {
        console.log(data);
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  /* GET ALL THE USERCHATS */
  public getUserChats() {
    const id = localStorage.getItem('userId');
    return this.http.get<any>(url + '/' + id);
  }

  /* GET A PARTICULAR CHAT*/
  public getUserChat(chatId): Observable<Chat> {
    const id = localStorage.getItem('userId');
    return this.http.get<any>(url + '/' + chatId + '/' + id);
  }

  /* SET THE CURRENT CHAT CHANGING BY A CLICK */
  public setCurrentChat(chatId): BehaviorSubject<Chat> {
    this.currentChat.next(chatId);

    const userChats = this.userChats.value;
    const chats = userChats.map(chat => {
      if (chat.id === chatId) {
        return { ...chat, newMessages: 0 };
      } else {
        return chat;
      }
    });
    this.userChats.next(chats);
    return chatId;
  }

  /* ACTUALIZE WITH A NEW MESSAGE*/
  public sendMessage(message): BehaviorSubject<Chat> {
    const id = localStorage.getItem('userId');
    const messageToSend = new Message(id, message, new Date(), false);
    this.newMessage.next(messageToSend);
    return message;
  }

  public sendaMessage(message): Observable<any> {
    console.log(message);
    return this.http.post<any>(url + '/messageToChat', message);
  }

}
