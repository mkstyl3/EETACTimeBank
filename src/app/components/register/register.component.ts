import {Component, EventEmitter, OnInit, Output, ViewContainerRef, ViewChild} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ToastsManager} from 'ng2-toastr';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';
import {ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import {ActivityService} from '../../service/activity.service';
import { ImageuploadComponent } from '../imageupload/imageupload.component';

declare const require: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  private title = 'EA Min1';
  public img = require('../../../assets/img/EA.jpg');
  @ViewChild('imageupload') public imageUpload: ImageuploadComponent;


  constructor(private userService: UserService, public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  onSubmit() {
    console.log('Form submitted!');
    }

  showSuccessToast(m: string) {
    this.toastr.success(m);
  }

  showErrorToast(m: string) {
    this.toastr.error(m);
  }

  ngOnInit() {
  }

  signUp(name: string, username: string, mail: string, password: string, password2: string ) { // Working
    if (password !== password2) {
      console.log('no coinciden');
      this.showErrorToast('Passwords doesn´t match');
    } else {
      const userData = { 'name': name, 'username': username, 'mail': mail, 'password': password };
      if (this.imageUpload.imageId) {userData['image'] = this.imageUpload.imageId; }
      this.userService.signUp$(userData).subscribe(
        data => {
          // this.userService.setUserLoggedIn();
          this.showSuccessToast('User ' + username + ' added!');
          localStorage.setItem('username', username);
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('token', data.token);
          this.router.navigate(['home']);
        },
        data => {
          switch (data.error.validationError) {
            case 'mail':
              this.showErrorToast('Invalid email format'); // Joi Validation failed
              break;
            case 'name':
              this.showErrorToast('Invalid name format');
              break;
            case 'username':
              this.showErrorToast('Invalid username format');
              break;
            case 'password':
              this.showErrorToast('Invalid password format');
              break;
          }
        });
    }
  }
}
