import { Component, OnInit }      from '@angular/core';
import {ActivityRequestService}   from '../../service/activity-request.service'
import {Activity}                 from '../../models/activity.model'
import {ActivityRequest}          from '../../models/activityRequest.model'
import {ActivityRequestResponse}  from '../../models/activityRequestResponse.model'
import {ActivityService} from '../../service/activity.service';
import {resolveProjectModule} from '@angular/cli/utilities/require-project-module';

@Component({
  selector: 'app-activity-request',
  templateUrl: './activity-request.component.html',
  styleUrls: ['./activity-request.component.css'],
  providers:[ActivityRequestService]
})
export class ActivityRequestComponent implements OnInit {

  public activityRequest: ActivityRequest;
    myPetition:    ActivityRequestResponse[];
    theirPetition: ActivityRequestResponse[];

  constructor(private actvitiyRequestService : ActivityRequestService) {

    this.actvitiyRequestService.getMyPetitions(localStorage.userId).subscribe(

      response => {
        if (response) {
          console.log(response)
          this.myPetition = response;
        }
      },
      error => {
        console.log(<any>error);
      }
    );

    this.actvitiyRequestService.getTheirPetitions(localStorage.userId).subscribe(

      response => {
        if (response) {
          console.log(response)
          this.theirPetition = response;
        }
      },
      error => {
        console.log(<any>error);
      }
    );

  }


  ngOnInit() {
  }




}
