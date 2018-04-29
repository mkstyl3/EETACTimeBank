import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserChatService} from '../../../../service/user.chat.service';

@Component({
  selector: 'app-messages-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
  providers: [UserChatService],
})
export class ConversationComponent implements OnInit {
  currentChat;
  constructor(private userChatService: UserChatService) { }

  ngOnInit() {
    this.userChatService.currentChat.subscribe(currentChat => {
      this.currentChat = currentChat;
    });
  }

}
