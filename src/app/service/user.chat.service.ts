import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Chat } from '../models/chat/chat';
import { Message } from '../models/chat/message';
import {MessageFromChat} from '../models/chat/MessageFromChat';
import {environment} from '../../environments/environment';
import * as io from 'socket.io-client';
import { messageTypes } from '../configs/enums_chat';

import {ChatList} from '../models/chat/chat_List';
const url = 'chats';

@Injectable()
export class UserChatService implements OnDestroy {
  currentChat = new BehaviorSubject(null);
  currentOppositeUserName = new BehaviorSubject(null);
  newMessage = new BehaviorSubject(null);
  userChats = new BehaviorSubject(null);
  private socket;
  private url = environment.urlChat;

  constructor(private http: HttpClient) {
  }

  ngOnDestroy() {

  }

  /* CREATE A SOCKET CONNECTION */
  socketConnect() {
    if (!this.socket) {
      this.socket = io(this.url);
      console.log('nou sockt creat' + this.socket);
      this.sendMessageSocket(messageTypes.NEW_USER, localStorage.getItem('userId'));
      return this.socket;
    }
  }
  /* SEND A MESSAGE VIA SOCKET*/
  sendMessageSocket(messageType, message) {
    this.socket.emit(messageType, JSON.stringify(message));
    console.log(JSON.stringify(message));
  }
  /* GET A NEW MESSAGE*/
  getPrivateMessage() {
    const observable = new Observable<MessageFromChat>(observer => {
      this.socket.on(messageTypes.NEW_MESSAGE, (data) => {
        console.log(data);
        observer.next(data);
      });
      return () => {
        // this.socket.disconnect();
      };
    });
    return observable;
  }
  /* GET A MESSAGE ERROR*/
  getMessagesErrors() {
    const observable = new Observable<Message>(observer => {
      this.socket.on(messageTypes.ERROR, (data) => {
        observer.next(data);
      });
      return () => {
        // this.socket.disconnect();
      };
    });
    return observable;
  }
  /* GET A CHAT ERROR, THIS CHAT WAS DELETED*/
  getChatError() {
    const observable = new Observable<string>(observer => {
      this.socket.on(messageTypes.ERRORCHAT, (data) => {
        observer.next(data);
      });
      return () => {
        // this.socket.disconnect();
      };
    });
    return observable;
  }

  /* GET A NEW CHAT*/
  getNewChat() {
    debugger;
    const observable = new Observable(observer => {
      this.socket.on(messageTypes.NEW_CHAT, (data) => {
        console.log(data);
        observer.next(data);
      });
      return () => {
        // this.socket.disconnect();
      };
    });
    return observable;
  }

  /*GET ACTIVITY NOTIFICATION*/
  getActivityNotification() {
    const observable = new Observable(observer => {
      this.socket.on('newActivity', (data) => {
        console.log(data);
        observer.next(data);
      });
      return () => {
        // this.socket.disconnect();
      };
    });
    return observable;
  }
  getNotification() {
    const observable = new Observable(observer => {
      this.socket.on('notification', (data) => {
        console.log(data);
        observer.next(data);
      });
      return () => {
        // this.socket.disconnect();
      };
    });
    return observable;
  }
  getNewRequest() {
    const observable = new Observable(observer => {
      this.socket.on('notNewReq', (data) => {
        console.log(data);
        observer.next(data);
      });
      return () => {
        // this.socket.disconnect();
      };
    });
    return observable;
  }
  getDelRequest() {
    const observable = new Observable<Message>(observer => {
      this.socket.on('notDelReq', (data) => {
        console.log(data);
        observer.next(data);
      });
      return () => {
        // this.socket.disconnect();
      };
    });
    return observable;
  }
  getAccRequest() {
    const observable = new Observable<Message>(observer => {
      this.socket.on('notAccReq', (data) => {
        console.log(data);
        observer.next(data);
      });
      return () => {
        // this.socket.disconnect();
      };
    });
    return observable;
  }
  getFinRequest() {
    const observable = new Observable<Message>(observer => {
      this.socket.on('notFinReq', (data) => {
        console.log(data);
        observer.next(data);
      });
      return () => {
        // this.socket.disconnect();
      };
    });
    return observable;
  }

  /* GET ALL THE USERCHATS */
  public getUserChats() {
    debugger;
    const id = localStorage.getItem('userId');
    return this.http.get<any>(url + '/' + id);
  }

  /* GET CHAT USERS */
  public getChatUsers(chatId): Observable<any> {
    debugger;
    const id = localStorage.getItem('userId');
    console.log('*** GET CHAT USERS ', chatId);
    return this.http.get<any>(url + '/users/' + chatId + '/' + id);
  }

  /* GET CHAT MESSAGES */
  public getChatMessages(chatId, offset, limit): Observable<any> {
    debugger;
    const id = localStorage.getItem('userId');
    return this.http.get<any>(url + '/messages/' + chatId + '/' + id, {
        params: {
          offset,
          limit
        },
      }
    );
  }

  /* SET THE CURRENT CHAT CHANGING BY A CLICK */
  /*SETTING ALSO THE OPPOSITE USERNAME*/
  public setCurrentChat(chatId): BehaviorSubject<Chat> {
    if (this.currentChat.value !== chatId) {
      this.currentChat.next(chatId);
    }

    const userChats = this.userChats.value;
    const chats = userChats.map(chat => {
      this.currentOppositeUserName.next(chat.userName);
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
    debugger;
    const messageDate = new Date();
    const temporaryMessageId = messageDate + 'ID';
    const userFromId = localStorage.getItem('userId');
    const messageToSend = new Message(userFromId, message, messageDate, false, temporaryMessageId);
    this.newMessage.next(messageToSend);
    return message;
  }
}
