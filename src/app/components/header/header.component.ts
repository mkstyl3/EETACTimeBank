import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivityRequest} from '../../models/activityRequest.model';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user = {username: 'Usuario', wallet: 'Wallet'};
  public urlBase = environment.urlFrontend;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getWallet();
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

  shutdown() {
    localStorage.clear();
    this.router.navigate(['/signin']);
  }
}
