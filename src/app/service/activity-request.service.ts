import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}   from '@angular/common/http';
import "rxjs/Rx";
import {ActivityRequest} from '../models/activityRequest.model'
import {Observable} from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ActivityRequestService {
  public url = environment.urlBackend;



  constructor(private http: HttpClient) {  }

  ////////*************METODES*******************////////////
  getMyPetitions(id){
    return this.http.get<ActivityRequest[]>('activityRequest/requested/' + id)
      .map(res => res);
  }

  getTheirPetitions(id){
    return this.http.get<ActivityRequest[]>('activityRequest/petitions/' + id)
      .map(res => res);
  }
  getCounters(id){
    return this.http.get('activityRequest/count/' + id)
      .map(res => res);
  }


  deletePetition(idPetition) {
    return this.http.delete('activityRequest/' + idPetition)
      .map (res=>res);

  }
}
