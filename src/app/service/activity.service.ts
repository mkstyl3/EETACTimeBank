import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/Rx';
import {Activity} from '../models/activity.model';
import {ActivityRequest} from '../models/activityRequest.model';
import {NovetatsResponse} from '../models/novetatsResponse';
import { environment } from '../../environments/environment';
import {User} from '../models/user.model';


@Injectable()
export class ActivityService {
  public url = environment.urlBackend;

  constructor(public http: HttpClient) { }

  /*************METODES*******************/

  newActivity(newActivity) {
    console.log(this.newActivity);
    return this.http.post<Activity>('activities/', newActivity).map(res => res);
  }

  updateActivity(id: string, updateActivity: any) {
    return this.http.put<any>('activities/' + id, updateActivity);
  }

  getNovetats() {
    return this.http.get<NovetatsResponse[]>('activities/novetats').map(res => res);
  }

  getActivity(id){
    return this.http.get<Activity>('activities/' +id).map(res => res);
  }

  makeApetition(newRequest){
    return this.http.post<ActivityRequest>('activities/' , newRequest).map(res => res);

  }


}
