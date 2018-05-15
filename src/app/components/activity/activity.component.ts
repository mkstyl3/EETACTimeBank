import { Component, OnInit } from '@angular/core';
import { Activity } from '../../models/activity.model';
import { User } from '../../models/user.model';
import { ActivityService } from '../../service/activity.service';
import { UserService } from '../../service/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivityRequest } from '../../models/activityRequest.model';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
  providers: [ ActivityService ]
})
export class ActivityComponent implements OnInit {

  showModalUser: boolean;
  showModalActivity: boolean;
  showModalPetition: boolean;

  activity: Activity;
  novetats: Activity;
  activitySelect: Activity;
  activityRequest: ActivityRequest;
  user: User;

  latitud_map: number;
  longitud_map: number;
  latitud_marker_user: number;
  longitud_marker_user: number;
  latitud_marker_activity: number;
  longitud_marker_activity: number;
  showMap: boolean;

  constructor(private activityService: ActivityService, private userService: UserService) {
    this.activity = new Activity('', 41.275443, 1.98665, 0, localStorage.username, '', '');
    this.showMap = false;
    this.showModalUser = false;
    this.showModalActivity = false;
    this.showModalPetition = false;
  }

  ngOnInit() {
    this.activityService.getActivityAll().subscribe(
      response => {
        if (response) {
          this.novetats = response; // Retorna totes les activitats
          console.log(this.novetats);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  addTag(tag: string) { this.activity.tags.push(tag); }

  // Mostra el modal d'un usuari
  veurePerfil(name: string) {
    this.showModalUser = false;
    this.userService.getProfileUser$(name).subscribe(
    data => {
        this.user = data;
        console.log(this.user);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
    this.showModalUser = true;
  }

  // Mostra el modal de una Activitat
  getActivity(activity: Activity) {
    this.showModalActivity = false;
    this.activitySelect = activity;
    console.log(this.activitySelect);

    // Prepara el mapa
    this.showMap = false;
    this.latitud_map = this.activitySelect.latitude;
    this.longitud_map = this.activitySelect.longitude;
    this.latitud_marker_activity = this.activitySelect.latitude;
    this.longitud_marker_activity = this.activitySelect.longitude;

    // Posición del Usuario
    const self = this;
    if (navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        // Devuelve los valores del CallBack
        self.latitud_marker_user = position.coords.latitude;
        self.longitud_marker_user = position.coords.longitude;
        self.showMap = true;
      });
    } else { console.error('Error: No se puede acceder a la localización'); }
    this.showModalActivity = true;
  }

  makeApetition(ToName, idActivity) {
    this.activityRequest = new ActivityRequest(localStorage.username, ToName, idActivity, false, null, null);
    this.sendAPetition(this.activityRequest);
  }

  sendAPetition(activityRequest) {
    console.log(this.activityRequest);
    this.activityService.makeApetition(this.activityRequest).subscribe(
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
