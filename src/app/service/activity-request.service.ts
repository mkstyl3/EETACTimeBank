import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}   from '@angular/common/http';
import "rxjs/Rx";
import {ActivityRequest} from '../models/activityRequest.model'
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ActivityRequestService {
  public url = 'http://localhost:3000';


  constructor(private http: HttpClient) {  }

  ////////*************METODES*******************////////////
  getPetitions(id){
    return this.http.get<ActivityRequest[]>(this.url+'/activityRequest/requested/'+id)
      .map(res=>res);
  }

}
