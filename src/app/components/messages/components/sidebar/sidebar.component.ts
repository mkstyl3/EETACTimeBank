import { Component, OnInit } from '@angular/core';
import {UserChatService} from '../../../../service/user.chat.service';

@Component({
  selector: 'app-messages-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [UserChatService],
})
export class SidebarComponent implements OnInit {
  userChats;
  constructor(private userChatService: UserChatService) { }

  ngOnInit() {
    return this.userChatService.getUserChats().subscribe(userChats => {
      this.userChats = userChats;
    });
  }

  onUserClick(user) {

  }
  hasNewMessages(chat) {
    return !!chat.newMessages;
  }
}
