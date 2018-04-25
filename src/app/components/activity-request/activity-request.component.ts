import { Component, OnInit }      from '@angular/core';
import {ActivityRequestService}   from '../../service/activity-request.service'
import {Activity}                 from '../../models/activity.model'
import {ActivityRequest}          from '../../models/activityRequest.model'

@Component({
  selector: 'app-activity-request',
  templateUrl: './activity-request.component.html',
  styleUrls: ['./activity-request.component.css']
})
export class ActivityRequestComponent implements OnInit {

  constructor() { }
  //private service: ActivityRequestService
   /* filter:     string;
    option:     string;
    peticions:  ActivityRequest ;*/

  ngOnInit() {
  }

  /*this.service.getAccepted().subscribe(petitions =>{
    this.peticions = petitions
    console.log(this.peticions);

  }


  sendFilter(){
   this.service.getPetitionsBy(this.option, this.filter).subscribe(petitions => {
     this.peticions = petitions
     console.log(this.peticions);
   })
  }*/

}
