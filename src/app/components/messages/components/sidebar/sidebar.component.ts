import {Component, OnInit} from '@angular/core';
import {UserChatService} from '../../../../service/user.chat.service';

@Component({
  selector: 'app-messages-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  userChats;
  currentChat;

  constructor(private userChatService: UserChatService) {
  }

  ngOnInit() {
    this.userChatService.getUserChats().subscribe(userChats => {
      this.userChatService.userChats.next(userChats);
    });

    this.userChatService.userChats.subscribe(userChats => {
      this.userChats = userChats;
    });

    this.userChatService.currentChat.subscribe(currentChat => {
      this.currentChat = currentChat;
    });

  }

  onUserClick(chatId) {
    this.userChatService.setCurrentChat(chatId);
  }

  hasNewMessages(chat) {
    return !!chat.newMessages;
  }
}
