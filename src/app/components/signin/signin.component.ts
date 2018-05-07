import {Component, EventEmitter, OnInit, Output, ViewContainerRef} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ToastsManager} from 'ng2-toastr';
import {User} from '../../models/user.model';
import { Router } from '@angular/router';

declare const require: any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [UserService]
})
export class SigninComponent implements OnInit {
  private img = require('../../../assets/img/EA.jpg');

  constructor(private userService: UserService, public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  showSuccessToast(m: string) {
    this.toastr.success(m);
  }

  showErrorToast(m: string) {
    this.toastr.error(m);
  }

  ngOnInit() {
  }

  test() { // Working
    this.userService.test$().subscribe(
      (data) => {
        this.showSuccessToast('Test passed!');
      },
      (data) => {
        alert(data.error);
      }
    );
  }

  signIn(username: string, password: string) {
    this.userService.signIn$(username, password).subscribe(
      data => {
        // this.userService.setUserLoggedIn();
        this.showSuccessToast('User ' + username + ' Logged In');
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('token', data.token);
        this.router.navigate(['home']);
      },
      data => {
        console.log();
        this.showErrorToast('Invalid credentials');
      });
  };
}

