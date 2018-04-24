import {Component, EventEmitter, OnInit, Output, ViewContainerRef} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ToastsManager} from 'ng2-toastr';
import {User} from '../../models/user.model';

declare const require: any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [UserService]
})
export class SigninComponent implements OnInit {
  private img = require('../../../assets/img/EA.jpg');

  constructor(private userService: UserService, public toastr: ToastsManager, vcr: ViewContainerRef) {
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
      });
  }

  insert(username: string, password: string) { // Working
    let user = new User(
      username, password, 'Albert', 'albert@gmail.com', null,
      null, null, null, null, null, null,
      null, false);
      console.log(user);
    this.userService.insert$(user).subscribe(
      data => {
        if (data.code === 11000) {
          console.log(data);
          this.showErrorToast('Duplicated key');
        }
        // Falta añadir mas códigos de error
        else {
          console.log(data);
          this.showSuccessToast('User ' + data.username + ' added!');
        }},
      data => {
        console.log(data);
        this.showErrorToast(data);
      });
  }

  signIn(username: string, password: string) {
    this.userService.signIn$(username, password).subscribe(
      data => {
        if (data.token) {
          localStorage.setItem('access-token', data.token); // store the token
          this.showSuccessToast('Logeado');
        }
        else if (data.response === 'User not exist') {
          this.showErrorToast(data.response);
        }

        else if (data.response === 'Invalid password') {
          this.showErrorToast(data.response);

        }
        else {
          this.showErrorToast(data.response);
        }
        });
}