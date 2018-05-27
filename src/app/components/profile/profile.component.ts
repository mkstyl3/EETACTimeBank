import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../models/user.model';
import { UserService } from '../../service/user.service';
import { ActivityService } from '../../service/activity.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Activity} from '../../models/activity.model';

declare let require: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, ActivityService]
})

export class ProfileComponent implements OnInit {

  user: User;
  activitySelected: Activity;
  showProfile: boolean;
  showView: boolean;
  showEdit: boolean;
  showMap: boolean;
  tagString: string;
  first: boolean;
  latitud_map: number;
  longitud_map: number;
  latitud_marker_user: number;
  longitud_marker_user: number;
  latitud_marker_activity: number;
  longitud_marker_activity: number;
  username: string;
  owner: boolean;
  userForeign: string;

  fullstar = require('../../../assets/img/star-full.png');
  star = require('../../../assets/img/star.png');
  star1img = this.fullstar;
  star2img = this.star;
  star3img = this.star;
  star4img = this.star;
  star5img = this.star;

  constructor(private http: HttpClient, private userService: UserService,
    private activityService: ActivityService, private route: ActivatedRoute,
    private router: Router) {
    this.showProfile = false;
    this.showView = false;
    this.showEdit = false;
    this.showMap = false;
    this.tagString = '';
    this.username = localStorage.getItem('username');

  }

  ngOnInit() {
    this.route.params.subscribe( params => params['username'] ?
    this.connect(params['username'], false) : this.connect(localStorage.getItem('username'), true)
  );
}

  // Recibe la respuesta del servidor
  connect(user: string, owner: boolean) {
    this.showProfile = false;
    this.owner = owner;
    if (owner === false) { this.userForeign = user; }
    this.userService.getProfileUser$(user).subscribe(
      data => {
        this.user = data;      // El JSON se guarda en user
        console.log(this.user);
        this.showProfile = true;      // Mostramos el resultado
        this.setStars(data.rating);
      },
      (err: HttpErrorResponse) => { console.log(err.error); }
    );
  }

  popupView(activity) {
    this.showView = false;
    this.activitySelected = activity;
    this.showView = true;

    // Prepara el mapa
    this.showMap = false;
    this.latitud_map = this.activitySelected.latitude;
    this.longitud_map = this.activitySelected.longitude;
    this.latitud_marker_activity = this.activitySelected.latitude;
    this.longitud_marker_activity = this.activitySelected.longitude;

    this.setUpPosicion(); // Coloca la posicion del usuario
  }

  popupEdit(activity) {
    this.showEdit = false;
    this.activitySelected = activity;
    this.showEdit = true;

    // Prepara el input de tags
    this.first = true;
    for (const tags of this.activitySelected.tags) {
      if (this.first === true) {
        this.tagString = tags;
        this.first = false;
      } else {
        this.tagString = this.tagString + ', ' + tags;
      }
    }

    // Prepara el mapa
    this.showMap = false;
    this.latitud_map = this.activitySelected.latitude;
    this.longitud_map = this.activitySelected.longitude;
    this.latitud_marker_activity = this.activitySelected.latitude;
    this.longitud_marker_activity = this.activitySelected.longitude;

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

    this.activityService.updateActivity(this.activitySelected._id, json).subscribe(data => {
      console.log(data);
      if (data.result === 'ACTUALIZADO') {
        $('#editActivity').modal('hide');   // Cierra el modal
      }
    });
  }

  popupReservation(activity) { console.log('Reservar ' + activity.name); }

  addChat() {
    const json = {
      user1: localStorage.getItem('username'),
      user2: this.userForeign
    };

    this.userService.addchat$(json).subscribe(status => {
      if (status.status != null && status.status === 'ok' && status.chatId) {
        this.router.navigate(['/messages'], { queryParams: { chatId: status.chatId }});
      }
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

  setStars(num: number) {
    num = Math.round(num);
    console.log(num);
    switch (num) {
      case 1:
      this.star1img = this.fullstar;
      this.star2img = this.star;
      this.star3img = this.star;
      this.star4img = this.star;
      this.star5img = this.star;
      break;
      case 2:
      this.star1img = this.fullstar;
      this.star2img = this.fullstar;
      this.star3img = this.star;
      this.star4img = this.star;
      this.star5img = this.star;
      break;
      case 3:
      this.star1img = this.fullstar;
      this.star2img = this.fullstar;
      this.star3img = this.fullstar;
      this.star4img = this.star;
      this.star5img = this.star;
      break;
      case 4:
      this.star1img = this.fullstar;
      this.star2img = this.fullstar;
      this.star3img = this.fullstar;
      this.star4img = this.fullstar;
      this.star5img = this.star;
      break;
      case 5:
      this.star1img = this.fullstar;
      this.star2img = this.fullstar;
      this.star3img = this.fullstar;
      this.star4img = this.fullstar;
      this.star5img = this.fullstar;
      break;
    }
  }
}
