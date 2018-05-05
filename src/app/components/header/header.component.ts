import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivityRequestService} from '../../service/activity-request.service';
import {ActivityRequest} from '../../models/activityRequest.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user = {username: 'Usuario', wallet: 'Wallet'};
  SearchDone = false;
  // doneActivitiesList = new ActivityRequest('', '', '', false, false, null);
  myActivitiesList: Array<ActivityRequest> = [];
  theirActivitiesList: Array<ActivityRequest> = [];
  constructor(private userService: UserService /*, private activityRequestService: ActivityRequestService*/) { }

  ngOnInit() {
    this.getWallet();
    this.getDoneActivities();
  }
  getWallet() {
    const id = localStorage.getItem('userId');
    this.userService.getUserWallet(id).subscribe(
      data => {
        this.user = data;
        console.log(this.user);
      },
      data => {
        console.log(data);
      });
  }
  getDoneActivities() {
    const id = localStorage.getItem('userId');

    this.userService.getPetitions(id).subscribe(
      data => {
        const da: any = data;
        this.myActivitiesList = da;
        console.log(data);
        this.SearchDone = true;
      }
    );
    this.userService.getTheirPetitions(id).subscribe(
      data => {
        const da2: any = data;
        this.theirActivitiesList = da2;
        console.log(data);
        this.SearchDone = true;
      }
    );

    /*
    this.activityRequestService.getPetitions(id).subscribe(
      data => {
        console.log(data);
      }
    );
    */
  }

}
