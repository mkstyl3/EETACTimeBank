import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import "rxjs/Rx";
import {Activity} from '../models/activity.model';
import {User} from '../models/user.model';


@Injectable()
export class ActivityService {
  public url = 'http://localhost:3000';

  constructor(public http: HttpClient) { }

  ////////*************METODES*******************////////////
    newActivity(newActivity: Activity){
        console.log(this.newActivity)
        return this.http.post<Activity>(this.url+'/activities/', newActivity)
          .map(res => res);
    }

}
