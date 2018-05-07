import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../models/user.model';
import { UserService } from '../../service/user.service';
import { ActivityService } from '../../service/activity.service';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, ActivityService]
})

export class ProfileComponent implements OnInit {

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

  constructor(private http: HttpClient, private userService: UserService,
              private activityService: ActivityService) {
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

    for (const tags of activity.tags) {
      console.log(tags);
    }

    // Prepara el mapa
    this.showMap = false;
    this.latitud_map = activity.latitude;
    this.longitud_map = activity.longitude;
    this.latitud_marker_activity = activity.latitude;
    this.longitud_marker_activity = activity.longitude;

    this.setUpPosicion(); // Coloca la posicion del usuario
  }

  editActivity(name, cost, description, tag, latitude, longitude) {
    const tags: string[] = tag.value.split(', '); // Prepara la lista de Tags
    const json = {
      name: name.value,
      cost: cost.value,
      description: description.value,
      latitude: latitude,
      longitude: longitude,
      tags: tags
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
