import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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

  constructor(private userChatService: UserChatService, private route: ActivatedRoute) {}

  ngOnDestroy() {
    this.getUserChats.unsubscribe();
    this.userChatsSubs.unsubscribe();
    this.currentChatSubs.unsubscribe();
  }

  ngOnInit() {
    this.getUserChats = this.userChatService.getUserChats().subscribe(userChats => {
      const chatId = this.route.snapshot.queryParams['chatId'];
      this.userChatService.userChats.next(userChats);
      console.log(userChats);
      if (chatId) {
        this.userChatService.setCurrentChat(chatId);
      }
    });

    this.userChatsSubs = this.userChatService.userChats.subscribe(userChats => {
      this.userChats = userChats;
    });

    this.currentChatSubs = this.userChatService.currentChat.subscribe(currentChat => {
      this.currentChat = currentChat;
    });

  }

  onUserClick(chatId) {
    debugger;
    this.userChatService.setCurrentChat(chatId);
  }

  hasNewMessages(chat) {
    return !!chat.newMessages;
  }
}
