import { Component, OnInit, Input} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
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
  nameUser: String;
  user: UserService;
  show: boolean;

  constructor(private http: HttpClient) {
    this.nameUser = 'ezio';
    this.show = false;
    this.connect();
  }

  ngOnInit() { this.connect(); }

  // Recibe la respuesta del servidor
  connect() {
    this.show = false;
    this.http.get<UserService>('users/' + this.nameUser).subscribe(
      data => {
        this.user = data;      // El JSON se guarda en user
        console.log(this.user);
        this.show = true;      // Mostramos el resultado
      },

      (err: HttpErrorResponse) => { console.log(err.error); }
    );
  }

  popupView(activity) { console.log('Ver ' + activity.name); }
  popupEdit(activity) { console.log('Editar ' + activity.name); }
}
