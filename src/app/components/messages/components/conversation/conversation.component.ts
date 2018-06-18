import {Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import {UserChatService} from '../../../../service/user.chat.service';
import {Chat} from '../../../../models/chat/chat';
import {messageTypes} from '../../../../configs/enums_chat';
import {ISubscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';

@Component({
  selector: 'app-messages-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
})
export class ConversationComponent implements OnInit, OnDestroy, AfterViewInit {
  conversation: Chat = {
    _id: null,
    users: [],
    messages: [],
  };
  finalMessagesReached;
  currentChatId;
  currentOppositeUserName;
  myPhoto;
  oppositePhoto;
  currentChat: ISubscription;
  newMessage: ISubscription;
  privateMessage: ISubscription;
  chatError;

  constructor(private userChatService: UserChatService, private router: Router) {
    this.conversation.messages = new Array();
  }

  ngOnDestroy() {
    debugger;
    this.conversation.users = [];
    this.conversation.messages = [];
    this.currentChat.unsubscribe();
    this.newMessage.unsubscribe();
    this.privateMessage.unsubscribe();
    this.currentChat = null;
    this.userChatService.currentChat.next(null);

  }

  sendToprofile(idUser) {
      if (idUser !== localStorage.getItem('userId')) {
        this.router.navigate(['/profile/' + this.currentOppositeUserName]);
      } else {
        this.router.navigate(['/home']);
      }
  }

  getMessages(currentChatId, offset, limit, callback) {
    this.userChatService.getChatMessages(currentChatId, offset, limit).subscribe(({ messages }) => {
      this.conversation.messages = [...messages, ...this.conversation.messages];
      if (messages.length < limit) {
        this.finalMessagesReached = true;
      }
      if (callback) {
        callback();
      }
    });
  }

  getUsers(currentChatId) {
    this.userChatService.getChatUsers(currentChatId).subscribe((users) => {
      this.conversation.users = users;
      this.assignPhotos();
    });
  }

  ngAfterViewInit () {
    this.conversation.users = [];
    this.conversation.messages = [];
    setTimeout(() => this.scrollConversation(), 0);
  }

  ngOnInit() {
    this.currentChat = null;
    this.userChatService.socketConnect();
    this.currentChat = this.userChatService.currentChat.subscribe( async(currentChatId) => {
      this.currentChatId = currentChatId;
      if (currentChatId) {
        this.conversation._id = currentChatId;
        this.conversation.messages = [];
        this.conversation.users = [];
        await this.getUsers(currentChatId);
        await this.getMessages(currentChatId, 0, 10, () => this.scrollConversation());
      }
    });

    this.userChatService.currentOppositeUserName.subscribe((actualOppositeUserName) => {
      this.currentOppositeUserName = actualOppositeUserName;
    });

    this.userChatService.getMessagesErrors().subscribe((messageWithError) => {
      this.conversation.messages.forEach(message => {
        if (message.id === messageWithError.id) {
          message.error = true;
        }
      });
    });
    this.userChatService.getChatError().subscribe((ChatId) => {
      const userChats = this.userChatService.userChats.value;
      const result = userChats.find(chat => chat.id !== ChatId);
      this.userChatService.userChats.next(result);
      if (this.currentChatId === ChatId) {
        this.currentChatId = null;
      }
      this.chatError = true;
      });


    this.newMessage = this.userChatService.newMessage.subscribe((message) => {
      if (message) {
        const frameTosend = {'chatId': this.currentChatId, message};
        this.userChatService.sendMessageSocket(messageTypes.NEW_MESSAGE, frameTosend);
        if (this.conversation) {
          this.conversation.messages.push(message);
          const userChats = this.userChatService.userChats.value;

          const chats = userChats.map(chat => {
            if (chat.id === this.currentChatId) {
              return {...chat, lastMessage: message.text};
            } else {
              return chat;
            }
          });
          this.userChatService.userChats.next(chats);
          this.scrollConversation();
        }
      }
    });
    this.userChatService.getNewChat().subscribe((chat => {
      if (chat) {
        const chatsActuals = this.userChatService.userChats.value;
        chatsActuals.push(chat);
        this.userChatService.userChats.next(chatsActuals);
      }
    }));
    this.privateMessage = this.userChatService.getPrivateMessage().subscribe(privateMessage => {
      if (this.conversation && privateMessage) {
             if (this.conversation._id === privateMessage.chatId) {
               this.conversation.messages.push(privateMessage.message);
               const ChatsActuals = this.userChatService.userChats.value;
               const mychats = ChatsActuals.map(chat => {
                 if (chat.id !== this.conversation._id) {
                   return chat;
                 } else {
                   return {...chat, lastMessage: privateMessage.message.text};
                 }
               });

             this.userChatService.userChats.next(mychats);
      } else {
             const userChats = this.userChatService.userChats.value;
             const chats = userChats.map(chat => {
                 if (chat.id === privateMessage.chatId) {
                    if (chat.userId === privateMessage.message.userFrom) {
                    return {...chat, lastMessage: privateMessage.message.text, newMessages: chat.newMessages + 1};
                    } else { /*IS FROM THE USER*/
                    return {...chat, lastMessage: privateMessage.message.text}; }
                 } else {
              return chat;
            }
          });
             this.userChatService.userChats.next(chats);
        }
      } else if (privateMessage) {
             const ChatsActuals = this.userChatService.userChats.value;
             const mychats = ChatsActuals.map(chat => {
             if (chat.id === privateMessage.chatId) {
                 if (chat.userId === privateMessage.message.userFrom) {
                   return {...chat, lastMessage: privateMessage.message.text, newMessages: chat.newMessages + 1};
                 } else {
                   return {...chat, lastMessage: privateMessage.message.text};
                 }
             } else {
               return chat;
          }
        });
             this.userChatService.userChats.next(mychats);
      }});
  }

  isTheUser(Object) {
    const id = localStorage.getItem('userId');
    return Object.userFrom === id;
  }

  scrollConversation() {
    if (this.conversation.messages) {
      setTimeout(function () {
        const mainEl = document.querySelector('.messages');
        mainEl.scrollTop = mainEl.scrollHeight;

        document.body.scrollTop = mainEl.scrollHeight;
        document.documentElement.scrollTop = mainEl.scrollHeight;
      }, 0);
    }
  }

  onConversationClicked() {
    debugger;
    const currentChatId = this.currentChatId;
    const userChats = this.userChatService.userChats.value;

    const chats = userChats.map(chat => {
      if (chat.id === currentChatId) {
        return { ...chat, newMessages: 0 };
      } else {
        return chat;
      }
    });
    this.userChatService.userChats.next(chats);

  }

  private setDate(message) {
    const newDate = new Date(message.date);
    if (newDate.getMinutes() < 10) {
      return newDate.getHours() + ':0' + newDate.getMinutes();
    }
    return newDate.getHours() + ':' + newDate.getMinutes();
  }

  private assignPhotos() {
    const id = localStorage.getItem('userId');
    if (this.conversation.users[0].userId === id) {
      this.myPhoto = this.conversation.users[0].userAvatar;
      this.oppositePhoto = this.conversation.users[1].userAvatar;
    } else {
      this.oppositePhoto = this.conversation.users[0].userAvatar;
      this.myPhoto = this.conversation.users[1].userAvatar;
    }
  }

  onScroll ({ target }) {
    const scrolledToTheTop = target.scrollTop === 0;
    if (scrolledToTheTop && !this.finalMessagesReached) {
      this.getMessages(this.currentChatId, this.conversation.messages.length, 10, null);
    }
  }
}
