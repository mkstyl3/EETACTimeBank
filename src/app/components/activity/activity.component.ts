import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Activity } from '../../models/activity.model';
import { User } from '../../models/user.model';
import { ActivityService } from '../../service/activity.service';
import { UserChatService } from '../../service/user.chat.service';
import { UserService } from '../../service/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivityRequest } from '../../models/activityRequest.model';
import { ISubscription } from 'rxjs/Subscription';
import { ToastrService } from 'ngx-toastr';
import { ImageuploadComponent } from '../imageupload/imageupload.component';



@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
  providers: [ActivityService, ToastrService]
})
export class ActivityComponent implements OnInit, OnDestroy {

  showModalUser: boolean;
  showModalActivity: boolean;
  showModalPetition: boolean;

  activity: Activity;
  novetats: any;
  activitySelect: Activity;
  activityRequest: ActivityRequest;
  user: User;
  favoritList: Activity[];
  latitud_map: number;
  longitud_map: number;
  latitud_marker_user: number;
  longitud_marker_user: number;
  latitud_marker_activity: number;
  longitud_marker_activity: number;
  showMap: boolean;
  activityNotifSubs: ISubscription;

  @ViewChild('activityimage') imageUploader: ImageuploadComponent;

  constructor(private activityService: ActivityService, private userService: UserService,
    private userChatService: UserChatService, private toastr: ToastrService) {
    this.activity = new Activity('', 41.275443, 1.98665, 0, localStorage.username, '', '');
    this.showMap = false;
    this.showModalUser = false;
    this.showModalActivity = false;
    this.showModalPetition = false;
  }

  ngOnDestroy() {
    this.activityNotifSubs.unsubscribe();
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

    this.userService.getProfileUser$(localStorage.getItem('username')).subscribe(
      data => {
        this.favoritList = data.favorite;
      }
    );

    this.userChatService.socketConnect();

    this.activityNotifSubs = this.userChatService.getActivityNotification().subscribe(
      response => {
        if (response) {
          this.novetats.push(response);
        }
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
          this.toastr.success('Has enviat una peticio per fer una activitat', 'Nova petició de Activitat');
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  onSubmit() {
    console.log(this.activity);
    if (this.imageUploader.imageId) {this.activity['imatge'] = this.imageUploader.imageId; }
    this.activityService.newActivity(this.activity).subscribe(
      response => {
        if (response) {
          console.log(response);
          this.imageUploader.reset();
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }


  // Establece el color del icono Favoritos
  isFavorite(activity: Activity): boolean {
    for (const i in this.favoritList) {
      if (this.favoritList[i]._id === activity._id) { return true; }
    }
    return false;
  }

  favorite(activity: Activity) {
    let find: boolean;
    let send: string[];

    find = false;
    send = this.favoritList.map((object) => {
      if (object._id === activity._id) { find = true; }
      return object._id;
    });

    if (find === false) {
      // Añadimos la actividad a Favoritos
      send.push(activity._id);
      this.favoritList.push(activity);
    } else {
      // Eliminamos la actividad de Favoritos
      const num = this.favoritList.indexOf(activity);
      send.splice(num, 1);
      this.favoritList.splice(num, 1);
    }

    this.update(send);
  }

  update(send: string[]) {
    this.userService.updateProfileUser$(localStorage.getItem('username'),
      {favorite: send}).subscribe(data => {
      console.log(data);
    });
  }
}
