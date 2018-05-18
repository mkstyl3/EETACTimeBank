import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivityRequest} from '../../models/activityRequest.model';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserChatService } from '../../service/user.chat.service';
import { Observable } from 'rxjs/Observable';
import { Message } from '../../models/chat/message';
import { ISubscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  user = {username: 'Usuario', wallet: 'Wallet'};
  public urlBase = environment.urlFrontend;
  public buscador;
  toast: ISubscription;
  constructor(private userService: UserService, private router: Router,
    private toastr: ToastrService, private userChatService: UserChatService) { }

  ngOnInit() {
    this.getWallet();
    this.userChatService.socketConnect();
    this.toast = this.userChatService.getNotification().subscribe(data => {
      console.log(data);
      this.showNotification(data);
    });
  }

  ngOnDestroy() {
    this.toast.unsubscribe();
  }

  showNotification(data: any) {
    console.log(data);
    switch (data['type']) {
      case'newActivityRequestTo':
      this.toastr.success(data['username'] + ' ha enviat una peticio per fer la activitat: '
      + data['activityname'], 'Nova petició de Activitat');
      break;
      case 'acceptRequest':
      this.toastr.success(data['username'] + ' ha acceptat la teva petició per fer la activitat: '
      + data['activityname'], 'Acceptada peticio de Activitat');
      break;
      case 'deleteRequest':
      this.toastr.error(data['username'] + ' ha eliminat la petició per fer la activitat: '
      + data['activityname'], 'Eliminada peticio de Activitat');
      break;
      case 'doneRequest':
      this.toastr.success(data['username'] + ' ha donat per finalitzada la activitat: '
      + data['activityname'], 'Finalitzada peticio de Activitat');
      break;
    }
  }
  getWallet() {
    const id = localStorage.getItem('userId');
    this.userService.getUserWallet(id).subscribe(
      data => {
        this.user = data;
      },
      data => {
        console.error(data);
      });
  }

  buscarUsuario() {
    this.router.navigate(['/profile/' + this.buscador]);
  }

  shutdown() {
    localStorage.clear();
    this.router.navigate(['/signin']);
  }
}
