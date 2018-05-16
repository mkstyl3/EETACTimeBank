import { Component, OnInit } from '@angular/core';
import { Activity } from '../../models/activity.model';
import { User } from '../../models/user.model';
import { NovetatsResponse } from '../../models/novetatsResponse';
import { ActivityService } from '../../service/activity.service';
import { UserChatService } from '../../service/user.chat.service';
import { UserService } from '../../service/user.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivityRequest } from '../../models/activityRequest.model';
import { isDate } from 'util';
import { DateFormatter } from '@angular/common/src/pipes/deprecated/intl';


@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
  providers: [ActivityService, UserChatService]
})
export class ActivityComponent implements OnInit {


  public activity: Activity;
  public activitySelect: Activity;
  public activityRequest: ActivityRequest;
  public user: User;
  public novetats: NovetatsResponse[];


  constructor(private activityService: ActivityService, private userService: UserService, private userChatService: UserChatService) {
    this.activity = new Activity('', 41.275443, 1.98665, 0, localStorage.username, '', '');
  }

  ngOnInit() {
    this.activityService.getNovetats().subscribe(
      response => {
        if (response) {
          console.log(response);
          this.novetats = response;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
    this.userChatService.socketConnect();

    this.userChatService.getActivityNotification().subscribe(
      response => {
        if (response) {
          this.novetats.push(response);
        }
      }
    );
  }



  addTag(tag: string) { this.activity.tags.push(tag); }

  veurePerfil(name: string) {
    this.userService.getProfileUser$(name).subscribe(
      data => {
        this.user = data;
        console.log(this.user);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  getActivity(activitySelect: Activity) {
    /*this.activityService.getActivity(id).subscribe(
      data=>{
        this.activity = data;
        console.log(this.activity);
      },
      (err: HttpErrorResponse)=>
      {
        console.log(err)
      }
    )*/
    this.activitySelect = activitySelect;
  }

  makeApetition(ToName, idActivity) {
    this.activityRequest = new ActivityRequest(localStorage.username, ToName, idActivity, false, null, null);
    this.sendAPetition(this.activityRequest);
  }

  sendAPetition(activityRequest) {

    console.log(this.activityRequest);
    this.activityService.makeApetition(this.activityRequest).subscribe(

      response => {
        if (response) {
          console.log(response);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  onSubmit() {
    console.log(this.activity);
    this.activityService.newActivity(this.activity).subscribe(
      response => {
        if (response) {
          console.log(response);
        }

      },
      error => {
        console.log(<any>error);
      }
    );
  }




}
