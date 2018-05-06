import {Component, OnInit} from '@angular/core';
import {UserChatService} from '../../../../service/user.chat.service';
import {Chat} from '../../../../models/chat/chat';
import {messageTypes} from '../../../../configs/enums_chat';

@Component({
  selector: 'app-messages-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
})
export class ConversationComponent implements OnInit {
  conversation: Chat = null;
  currentChatId;

  constructor(private userChatService: UserChatService) {
  }

  ngOnInit() {
    this.userChatService.socketConnect();
    localStorage.getItem('userId');
    this.userChatService.sendMessageSocket(messageTypes.NEW_USER, localStorage.getItem('userId'));

    this.userChatService.currentChat.subscribe((currentChatId) => {
      this.currentChatId = currentChatId;

      if (currentChatId) {
        this.userChatService.getUserChat(currentChatId).subscribe((conversation) => {
          this.conversation = conversation;
          this.scrollConversation();
        });
      }
    });

    this.userChatService.newMessage.subscribe((message) => {
      if (message) {
        const frameTosend = {'chatId': this.currentChatId, message};
        this.userChatService.sendMessageSocket(messageTypes.NEW_MESSAGE, frameTosend);
        this.conversation.messages.push(message);
        this.scrollConversation();
      }
    });
    this.userChatService.getPrivateMessage().subscribe(privateMessage => {
      if (this.conversation) {
        this.conversation.messages.push(privateMessage);
        this.scrollConversation();
      }

     // const currentChat = this.userChatService.currentChat;
      const userChats = this.userChatService.userChats.value;
      console.log(userChats);
      console.log(privateMessage);
      const chats = userChats.map(chat => {
        console.log('chat');
        console.log(chat);
        if (chat.userId === privateMessage.userFrom) {
          return { ...chat, lastMessage: privateMessage.text, newMessages: chat.newMessages + 1 };
        } else {
          return chat;
        }
      });
      this.userChatService.userChats.next(chats);
    });
  }

  isTheUser(Object) {
    const id = localStorage.getItem('userId');
    if (Object.userFrom === id) {
      return true;
    }
    return false;
  }

  scrollConversation () {
    setTimeout(function() {
      const mainEl = document.querySelector('.messages');
      mainEl.scrollTop = mainEl.scrollHeight;

      document.body.scrollTop = mainEl.scrollHeight;
      document.documentElement.scrollTop = mainEl.scrollHeight;
    }, 0);
  }

  onConversationClicked() {
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

}
