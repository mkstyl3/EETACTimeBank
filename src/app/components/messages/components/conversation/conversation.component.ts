import {Component, OnInit} from '@angular/core';
import {UserChatService} from '../../../../service/user.chat.service';
import {Chat} from '../../../../models/chat/chat';

@Component({
  selector: 'app-messages-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
})
export class ConversationComponent implements OnInit {
  conversation: Chat = null;
  currentChatId;

  constructor(private userChatService: UserChatService) {}

  ngOnInit() {
    this.userChatService.currentChat.subscribe((currentChatId) => {
      this.currentChatId = currentChatId;

      if (currentChatId) {
        this.userChatService.getUserChat(currentChatId).subscribe((conversation) => {
          this.conversation = conversation;
        });
      }
    });

    this.userChatService.newMessage.subscribe((message) => {
      if (message) {
        this.conversation.messages.push(message);
        console.log(message);
      }
    });
  }

  isTheUser(Object) {
    if (Object.userTo === '1') {
      return true;
    }
    return false;
  }

}
