import {Component, OnInit} from '@angular/core';
import {Message} from '../../../../models/chat/message';
import {UserChatService} from '../../../../service/user.chat.service';

@Component({
  selector: 'app-messages-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  message;

  constructor(private userChatService: UserChatService) {}

  ngOnInit() {}

  onSendMessage() {
    this.userChatService.sendMessage(this.message);
    this.message = null;
  }
  CurrentChat() {
    if (!this.userChatService.currentChat.value) {
      return false;
    }
    return true;
  }
}
