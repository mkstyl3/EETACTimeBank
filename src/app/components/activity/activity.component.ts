import { Component, OnInit } from '@angular/core';
import {Activity} from '../../models/activity.model';
import {User} from '../../models/user.model';
import {NovetatsResponse} from '../../models/novetatsResponse'
import {ActivityService} from '../../service/activity.service';
import { UserService } from '../../service/user.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivityRequest} from '../../models/activityRequest.model';
import {isDate} from 'util';
import {DateFormatter} from '@angular/common/src/pipes/deprecated/intl';


@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
  providers:[ActivityService]
})
export class ActivityComponent implements OnInit {


  public activity: Activity;
  public activityRequest : ActivityRequest;
  public user: User;
  public novetats: NovetatsResponse[];


  constructor(private activityService: ActivityService, private userService: UserService) {
    this.activity = new Activity('', 10, 10, 0, localStorage.username, '', '');
  }

  ngOnInit() {
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
  }

  addTag(tag: string) { this.activity.tags.push(tag); }

  veurePerfil(name:string){
      this.userService.getProfileUser$(name).subscribe(
        data=>{
          this.user = data;
          console.log(this.user);
          },
        (err: HttpErrorResponse) =>
        {
          console.log(err)
        }
      )
  }

  getActivity(id){
    this.activityService.getActivity(id).subscribe(
      data=>{
        this.activity = data;
        console.log(this.activity);
      },
      (err: HttpErrorResponse)=>
      {
        console.log(err)
      }
    )
  }

  makeApetition(idFrom, idActivity, ){
    this.activityRequest = new ActivityRequest(localStorage.userId, idFrom,idActivity, false, null, null);
    return

  }

  sendAPetition(activityRequest){

    console.log(this.activityRequest)
    this.activityService.makeApetition(this.activityRequest).subscribe(

      response =>{
        if(response){
          console.log(response)
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  onSubmit() {
    console.log(this.activity);
    this.activityService.newActivity(this.activity).subscribe(
      response => {
        if (response) {
          console.log(response);
        }

      },
      error => {
        console.log(<any>error);
      }
    );
  }




}
