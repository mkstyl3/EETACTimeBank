import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivityRequestService} from '../../service/activity-request.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any;
  doneActivitiesList: any;
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
      },
      data => {
        console.log(data);
      });
  }
  getDoneActivities() {
    const id = localStorage.getItem('userId');

    this.userService.getPetitions(id).subscribe(
      data => {
        this.doneActivitiesList = data;
        console.log(data);
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
