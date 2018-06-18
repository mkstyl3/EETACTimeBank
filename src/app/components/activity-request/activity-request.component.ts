import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivityRequestService } from '../../service/activity-request.service'
import { Activity } from '../../models/activity.model'
import { ActivityRequest } from '../../models/activityRequest.model'
import { ActivityRequestResponse } from '../../models/activityRequestResponse.model'
import { ActivityService } from '../../service/activity.service';
import { resolveProjectModule } from '@angular/cli/utilities/require-project-module';
import { error } from 'util';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Message } from '../../models/chat/message';
import { ISubscription } from 'rxjs/Subscription';
import { UserChatService } from '../../service/user.chat.service';
import { RateComponent } from '../rate/rate.component';

@Component({
  selector: 'app-activity-request',
  templateUrl: './activity-request.component.html',
  styleUrls: ['./activity-request.component.css'],
  providers: [ActivityRequestService]
})
export class ActivityRequestComponent implements OnInit, OnDestroy {

  public activityRequest: ActivityRequest;
  myPetition: ActivityRequestResponse[];
  theirPetition: ActivityRequestResponse[];
  counters;
  notNewActSub: ISubscription;
  notDelActSub: ISubscription;
  notAccActSub: ISubscription;
  notFinActSub: ISubscription;
  @ViewChild('apprate') apprate: RateComponent;

  constructor(private actvitiyRequestService: ActivityRequestService,
    private userChatService: UserChatService) {
  }

  ngOnDestroy() {
    this.notAccActSub.unsubscribe();
    this.notDelActSub.unsubscribe();
    this.notFinActSub.unsubscribe();
    this.notNewActSub.unsubscribe();
  }


  ngOnInit() {
    this.userChatService.socketConnect();
    this.notNewActSub = this.userChatService.getNewRequest().subscribe(data => {
      if (data) {
        if (data['userTo'].username === localStorage['username']) {
          this.theirPetition.push(data);
        } else {
          this.myPetition.push(data);
        }
      }
    });
    this.notDelActSub = this.userChatService.getDelRequest().subscribe(data => {
      if (data) {
        let pos = this.theirPetition.findIndex(element => element['_id'] === data['id']);
        if (pos > -1) { this.theirPetition.splice(pos); }
        pos = this.myPetition.findIndex(element => element['_id'] === data['id']);
        if (pos > -1) { this.myPetition.splice(pos); }
      }
    });
    this.notAccActSub = this.userChatService.getAccRequest().subscribe(data => {
      if (data) {
        let pos = this.myPetition.findIndex(element => element['_id'] === data['id']);
        if (pos > -1) { this.myPetition[pos]['accepted'] = true; }
      }
    });
    this.notFinActSub = this.userChatService.getFinRequest().subscribe(data => {
      if (data) {
        let pos = this.theirPetition.findIndex(element => element['_id'] === data['id']);
        if (pos > -1) { this.theirPetition[pos]['isDone'] = true; }
      }
    });
    this.getPeticions();
  }

  getPeticions() {
    this.actvitiyRequestService.getMyPetitions(localStorage.userId).subscribe(
      response => {
        if (response) {
          console.log(response);
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
          console.log(response);
          this.theirPetition = response;
        }
      },
      error => {
        console.log(<any>error);
      }
    );


    this.actvitiyRequestService.getCounters(localStorage.userId).subscribe(
      response => {
        if (response) {
          console.log(response);
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
        if (data['message'] === 'ok') {
          peticion.accepted = true;
        }
      }
    );
  }

  donePetition(peticion) {
    this.apprate.show(peticion._id);
    /*this.actvitiyRequestService.donePetition(peticion._id).subscribe(
      data => {
        console.log(data);
        if (data['message'] === 'ok') {
          peticion.isDone = true;
        }
      }
    );*/
  }

  sendDonePeticion(data) {
    console.log(data);
    let rating = {userId: localStorage.getItem('userId'), comment: data['comment'], rate: data['rate']};
    this.actvitiyRequestService.donePetition(data['id'], data['rate'], rating).subscribe(
      resp => {
        if (resp['message'] === 'ok') {
          let pos = this.myPetition.findIndex(element => element['_id'] === data['id']);
        if (pos > -1) { this.myPetition[pos]['isDone'] = true; }
        }
      }
    );
  }


}






