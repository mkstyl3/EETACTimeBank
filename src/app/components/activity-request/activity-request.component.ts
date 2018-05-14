import { Component, OnInit }      from '@angular/core';
import {ActivityRequestService}   from '../../service/activity-request.service'
import {Activity}                 from '../../models/activity.model'
import {ActivityRequest}          from '../../models/activityRequest.model'
import {ActivityRequestResponse}  from '../../models/activityRequestResponse.model'
import {ActivityService} from '../../service/activity.service';
import {resolveProjectModule} from '@angular/cli/utilities/require-project-module';
import {error} from 'util';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Message } from '../../models/chat/message';

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

    }


  ngOnInit() {
    this.getPeticions();
  }

  getPeticions() {
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
  deletePetition(peticion) {
    const response = confirm("estas segur d'esborrar la petició?")
    if (response) {

      this.actvitiyRequestService.deletePetition(peticion).subscribe(
        data => {
          if (data) {
            this.getPeticions();
            console.log(data);
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    }
  }

  acceptPetition(peticion) {
    this.actvitiyRequestService.acceptPetition(peticion._id).subscribe(
      data => {
        console.log(data);
        if (data.message === 'ok') {
          peticion.accepted = true;
        }
      }
    );
  }

  donePetition(peticion) {
    this.actvitiyRequestService.donePetition(peticion._id).subscribe(
      data => {
        console.log(data);
        if (data.message === 'ok') {
          peticion.accepted = true;
        }
      }
    );
  }


}






