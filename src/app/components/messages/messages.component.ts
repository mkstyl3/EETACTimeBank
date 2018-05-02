import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserChatService} from '../../service/user.chat.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers: [UserChatService],
})
export class MessagesComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
}
