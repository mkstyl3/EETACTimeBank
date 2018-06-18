import { Component, OnInit } from '@angular/core';
import { Activity } from '../../models/activity.model';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favoritList: Activity[];
  id: string;
  showData: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() { this.select(); }

  select() {
    this.showData = false;
    this.favoritList = [];
    this.userService.getProfileUser$(localStorage.getItem('username')).subscribe(data => {
      this.favoritList = data.favorite;
      console.log(this.favoritList);
      this.showData = true;
    });
  }

  // Establece el color del icono Favoritos
  isFavorite(activity: Activity): boolean {
    for (const i in this.favoritList) {
      if (this.favoritList[i]._id === activity._id) { return true; }
    }
    return false;
  }

  // Lista de Favoritos
  favorite(activity: Activity) {
    let find: boolean;
    find = false;
    let send: string[];
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
      if (data.result === 'ERROR') {
        // this.ShowMessage(data.result);
      }
    });
  }
}
