import { Component, OnInit, Input} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Activity } from '../../models/activity.model';
import { UserService } from '../../service/user.service';
import { ActivityService } from '../../service/activity.service';
import {componentRefresh} from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, ActivityService]
})

export class ProfileComponent implements OnInit {

  @Input() newSearch: Boolean;
  nameUser: string;
  user: User;
  show: boolean;
  id_activity: string;
  latitud_map: number;
  longitud_map: number;
  latitud_marker_user: number;
  longitud_marker_user: number;
  latitud_marker_activity: number;
  longitud_marker_activity: number;
  showMap: boolean;

  constructor(private http: HttpClient, private userService: UserService, private activityService: ActivityService) {
    this.show = false;
    this.showMap = false;
  }

  ngOnInit() { this.connect(); }

  // Recibe la respuesta del servidor
  connect() {
    this.show = false;
    this.userService.getProfileUser$(localStorage.getItem('username')).subscribe(
      data => {
        this.user = data;      // El JSON se guarda en user
        console.log(this.user);
        this.show = true;      // Mostramos el resultado
      },

      (err: HttpErrorResponse) => { console.log(err.error); }
    );
  }

  popupView(activity) {
    // Prepara el mapa
    this.showMap = false;
    this.latitud_map = activity.latitude;
    this.longitud_map = activity.longitude;
    this.latitud_marker_activity = activity.latitude;
    this.longitud_marker_activity = activity.longitude;

    this.setUpPosicion(); // Coloca la posicion del usuario
  }

  popupEdit(activity) {
    this.id_activity = activity._id;
    // Prepara el mapa
    this.showMap = false;
    this.latitud_map = activity.latitude;
    this.longitud_map = activity.longitude;
    this.latitud_marker_activity = activity.latitude;
    this.longitud_marker_activity = activity.longitude;

    this.setUpPosicion(); // Coloca la posicion del usuario
  }

  editActivity(name, cost, description, tags, latitude, longitude) {

    /* TODO: eliminar los campos que no se rellenan para que no se elimine el contenido anterior */
    const json = {
      name: name.value,
      cost: cost.value,
      description: description.value,
      latitude: latitude,
      longitude: longitude
    };

    console.log(json); // Body de la petición PUT

    this.activityService.updateActivity(this.id_activity, json).subscribe(data => {
      console.log(data);
      if (data.result === 'ACTUALIZADO') { console.log('OK'); }
    });

  }


  /*******************  MAPAS  *******************/

  // Inicializa el mapa y el marcador
  setUpPosicion() {
    const self = this;
    if (navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        // Devuelve los valores del CallBack
        self.latitud_marker_user = position.coords.latitude;
        self.longitud_marker_user = position.coords.longitude;
/*
        // Si la actividad no tiene ubicación se le asigna la del usuario
        if ((self.latitud_map === null) || (self.longitud_map === null)) {
          self.latitud_map = self.latitud_marker_user;
          self.longitud_map = self.longitud_marker_user;
        }
*/
        self.showMap = true;
      });
    } else { console.error('Error: No se puede acceder a la localización'); }
  }

  // Obtiene las coordenadas del nuevo marker
  mapClick(event) {
    this.latitud_marker_activity = event.coords.lat;
    this.longitud_marker_activity = event.coords.lng;
  }

}
