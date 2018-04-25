import { Injectable } from '@angular/core';
import {HttpClient}   from '@angular/common/http';
import "rxjs/Rx";
import {ActivityRequest} from '../models/activityRequest.model'
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ActivityRequestService {
  domain: string        = "http://localhost:3000/activityRequest";
  petitionModified      = ActivityRequest;

  constructor(private http: HttpClient) { }

  /* GET PETITIONS BY FILTER*/
  getPetitionsBy(filter: String, value: String){
    return this.http.get<ActivityRequest>(`${this.domain}/filter/`+filter+'/'+value).map(res => res)}
  }

