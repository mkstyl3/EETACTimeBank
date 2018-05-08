import { Component, OnInit } from '@angular/core';
import {Activity} from '../../models/activity.model';
import {User} from '../../models/user.model';
import {NovetatsResponse} from '../../models/novetatsResponse'
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

  public title: string;
  public activity: Activity;
  public user: User;
  public novetats: NovetatsResponse[];


  constructor(private activityService: ActivityService)
      {
<<<<<<< HEAD
        this.activity = new Activity("", 10, 10, 10, localStorage.username, "", "", "");
=======
        this.activity = new Activity("", 10, 10, 10, localStorage.userId, "", "", "");

        this.activityService.getNovetats().subscribe(
          response=> {
            if(response){
              console.log(response)
              this.novetats = response;
            }
          },
          error=> {
            console.log(<any>error);
          }
        );


>>>>>>> bbf959e618cefb1c69da0f5aa40096205b13eedb
      }

  ngOnInit() {
  }

  addTag(tag: string) {
    this.activity.tags.push(tag);
  }

  onSubmit(){
    console.log(this.activity);

    this.activityService.newActivity(this.activity).subscribe(
      response =>{
        if(response){
          console.log(response)
        }

      },
      error=> {
        console.log(<any>error);
      }
    );
  }

}
