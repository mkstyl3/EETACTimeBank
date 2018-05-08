import { Component, OnInit } from '@angular/core';
import {ActivityRequestService} from '../../service/activity-request.service';
import {ActivityRequest} from '../../models/activityRequest.model';

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
  constructor(private activityRequestService: ActivityRequestService) { }

  ngOnInit() {
    this.getDoneActivities();
  }
  getDoneActivities() {
    const id = localStorage.getItem('userId');
    this.activityRequestService.getMyPetitions(id).subscribe(
      data => {
        const da: any = data;
        this.myActivitiesList = da;
        this.SearchDone = true;
      }
    );
    this.activityRequestService.getTheirPetitions(id).subscribe(
      data => {
        const da2: any = data;
        this.theirActivitiesList = da2;
        this.SearchDone = true;
      }
    );
  }

}
