import {Component, OnInit, OnDestroy} from '@angular/core';
import {UserChatService} from '../../../../service/user.chat.service';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-messages-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit , OnDestroy {
  userChats;
  currentChat;
  getUserChats: ISubscription;
  userChatsSubs: ISubscription;
  currentChatSubs: ISubscription;

  constructor(private userChatService: UserChatService) {
  }
  ngOnDestroy() {
    this.getUserChats.unsubscribe();
    this.userChatsSubs.unsubscribe();
    this.currentChatSubs.unsubscribe();
  }

  ngOnInit() {
    this.getUserChats = this.userChatService.getUserChats().subscribe(userChats => {
      this.userChatService.userChats.next(userChats);
    });

    this.userChatsSubs = this.userChatService.userChats.subscribe(userChats => {
      this.userChats = userChats;
    });

    this.currentChatSubs = this.userChatService.currentChat.subscribe(currentChat => {
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
