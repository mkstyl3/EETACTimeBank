import { Component, OnInit }      from '@angular/core';
import {ActivityRequestService}   from '../../service/activity-request.service'
import {Activity}                 from '../../models/activity.model'
import {ActivityRequest}          from '../../models/activityRequest.model'
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
  petition: ActivityRequest[];

  constructor(private actvitiyRequestService : ActivityRequestService) {

    this.actvitiyRequestService.getPetitions(localStorage.userId).subscribe(

      response => {
        if (response) {
          console.log(response)
          //this.petition = response;
        }
      },
      error => {
        console.log(<any>error);
      }
    );

  }


  ngOnInit() {
  }

  myPetitions(){
    this.actvitiyRequestService.getPetitions(localStorage.userId).subscribe(
      response => {
        if (response) {
          console.log(response)
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }



}
