import { Component, OnInit, Input} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Activity } from '../../models/activity.model';
import { UserService } from '../../service/user.service';
import { ActivityService } from '../../service/activity.service';

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
  latitud_map: number;
  longitud_map: number;
  latitud_marker_user: number;
  longitud_marker_user: number;
  latitud_marker_activity: number;
  longitud_marker_activity: number;
  showMap: boolean;

  constructor(private http: HttpClient, private userService: UserService) {
    this.nameUser = 'alberti_tu';
    this.show = false;
    this.showMap = false;
  }

  ngOnInit() { this.connect(); }

  // Recibe la respuesta del servidor
  connect() {
    this.show = false;
    this.userService.getProfileUser$(this.nameUser).subscribe(
      data => {
        this.user = data;      // El JSON se guarda en user
        console.log(this.user);
        this.show = true;      // Mostramos el resultado
      },

      (err: HttpErrorResponse) => { console.log(err.error); }
    );
  }

  popupView(activity) {
    console.log('Ver ' + activity.name);

    // Prepara el mapa
    this.latitud_map = activity.latitude;
    this.longitud_map = activity.longitude;
    this.latitud_marker_activity = activity.latitude;
    this.longitud_marker_activity = activity.longitude;

    this.setUpPosicion(); // Coloca la posicion del usuario
  }
  popupEdit(activity) { console.log('Editar ' + activity.name); }


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
    /*
    this.latitud_marker_user = event.coords.lat;
    this.longitud_marker_user = event.coords.lng;
    */
  }

}
