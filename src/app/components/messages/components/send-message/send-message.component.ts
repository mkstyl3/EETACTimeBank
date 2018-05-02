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

  constructor(private userChatService: UserChatService) {
  }

  ngOnInit() {
  }

  onSendMessage() {
    console.log(this.message);
    this.userChatService.sendMessage(this.message);
  }
}
