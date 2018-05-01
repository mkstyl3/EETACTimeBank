import {Component, OnInit} from '@angular/core';
import {UserChatService} from '../../../../service/user.chat.service';

@Component({
  selector: 'app-messages-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  userChats;
  userTo;

  constructor(private userChatService: UserChatService) {
  }

  ngOnInit() {
    return this.userChatService.getUserChats().subscribe(userChats => {
      this.userChats = userChats;
    });
  }

  onUserClick(chatId) {
    this.userChatService.setCurrentChat(chatId);
    //this.userTo = userId;
  }

  hasNewMessages(chat) {
    return !!chat.newMessages;
  }
}
