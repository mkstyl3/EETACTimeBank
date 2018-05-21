import { Component, OnInit } from '@angular/core';
import {ActivityRequestService} from '../../service/activity-request.service';
import {ActivityRequest} from '../../models/activityRequest.model';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-table-activity-request',
  providers: [ActivityRequestService],
  templateUrl: './table-activity-request.component.html',
  styleUrls: ['./table-activity-request.component.css'],

})
export class TableActivityRequestComponent implements OnInit {
  SearchDone = false;
  myActivitiesList: Array<ActivityRequest> = [];
  theirActivitiesList: Array<ActivityRequest> = [];
  user = {username: 'Usuario', wallet: 'Wallet'};
  constructor(private activityRequestService: ActivityRequestService, private userService: UserService) { }

  ngOnInit() {
    this.getDoneActivities();
    this.getWallet();
  }
  getDoneActivities() {
    const id = localStorage.getItem('userId');
    this.activityRequestService.getMyPetitions(id).subscribe(
      data => {
        const da: any = data;
        this.myActivitiesList = da;
        this.SearchDone = true;
        console.log(this.myActivitiesList);
      }
    );
    this.activityRequestService.getTheirPetitions(id).subscribe(
      data => {
        const da2: any = data;
        this.theirActivitiesList = da2;
        this.SearchDone = true;
        console.log(this.theirActivitiesList);
      }
    );
  }
  getWallet() {
    const id = localStorage.getItem('userId');
    this.userService.getUserWallet(id).subscribe(
      data => {
        this.user = data;
        console.log(data);
      },
      data => {
        console.error(data);
      });
  }

}
