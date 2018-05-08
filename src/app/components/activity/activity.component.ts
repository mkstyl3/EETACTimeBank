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


  constructor(private activityService: ActivityService) {
    this.activity = new Activity('', 10, 10, 0, localStorage.username, '', '');
  }

  ngOnInit() { }

  addTag(tag: string) { this.activity.tags.push(tag); }

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
