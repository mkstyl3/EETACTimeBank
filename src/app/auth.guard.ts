import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './service/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(public userService: UserService){}
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("OnlyLoggedInUsers");
    if (this.userService.getUserLoggedIn()) { 
      return true;
    } else {
      window.alert("You don't have permission to view this page"); 
      return false;
    }
  }
}
