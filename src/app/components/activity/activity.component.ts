import { Component, OnInit } from '@angular/core';
import {Activity} from '../../models/activity.model';
import {User} from '../../models/user.model';
import {NovetatsResponse} from '../../models/novetatsResponse';
import {ActivityService} from '../../service/activity.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
  providers:[ActivityService]
})
export class ActivityComponent implements OnInit {

  //registrar una nova activitat
  public activityName:          string;
  public activityDescription:   string;
  public activityCost:          any;
  public activityCategory:      string[];
  public activityTag:          string[];
  public activityImatge:        string;


  public activity: Activity;
  public user: User;
  public novetats: NovetatsResponse[];

  constructor(private activityService: ActivityService) {

        this.activityService.getNovetats().subscribe(
          response => {
            if(response) {
              console.log(response)
              this.novetats = response;

            }
          },
          error => { console.log(<any>error)}
        );

}

  ngOnInit() {
  }

  onSubmit(){

    const newActivity : Activity = new Activity( this.activityName, 10, 10,
                        this.activityCost,
                        localStorage.userId, this.activityDescription, "",  "",
                        this.activityTag, this.activityCategory );

    console.log("*** newActivity", newActivity);

    this.activityService.newActivity(newActivity).subscribe(
      response =>{
        if(response){
          console.log(this.activity)
          console.log(response)
        }

      },
      error=> {
        console.log(<any>error);
      }
    );
  }




}
