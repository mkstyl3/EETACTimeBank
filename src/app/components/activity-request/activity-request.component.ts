import { Component, OnInit }      from '@angular/core';
import {ActivityRequestService}   from '../../service/activity-request.service'
import {Activity}                 from '../../models/activity.model'
import {ActivityRequest}          from '../../models/activityRequest.model'
import {ActivityRequestResponse}  from '../../models/activityRequestResponse.model'
import {ActivityService} from '../../service/activity.service';
import {resolveProjectModule} from '@angular/cli/utilities/require-project-module';
import {error} from 'util';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

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
    counters;




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


      this.actvitiyRequestService.getCounters(localStorage.userId).subscribe(
        response => {
          if(response) {
            console.log(response)
            this.counters = response;
          }
        },
       );
    }


  ngOnInit() {
  }
  deletePetition(id) {
    const response = confirm("estas segur d'esborrar la petició?")
    if (response) {

      this.actvitiyRequestService.deletePetition(id).subscribe(
        data => {
          if (data) {

            console.log(data)
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    }
  }return;


}






