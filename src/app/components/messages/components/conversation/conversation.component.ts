import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserChatService} from '../../../../service/user.chat.service';
import {Chat} from '../../../../models/chat/chat';
@Component({
  selector: 'app-messages-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
  providers: [UserChatService],
})
export class ConversationComponent implements OnInit {
  currentChat: Chat = null;
  constructor(private userChatService: UserChatService) {
    this.currentChat = null;
  }

  ngOnInit() {
    this.userChatService.getUserChat(25).subscribe((currentChat) => {
      this.currentChat = currentChat;
    });
  }

  isTheUser(Object)
  { if (Object.userTo == 1)
  {return true}
    return false;
  }

}
