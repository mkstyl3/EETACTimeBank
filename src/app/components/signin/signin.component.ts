import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewContainerRef } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ToastsManager } from 'ng2-toastr';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

declare const require: any;
declare const gapi: any;
declare const FB: any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [UserService]
})
export class SigninComponent implements AfterViewInit, OnInit {
  public img = require('../../../assets/img/EA.jpg');

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

  signIn(username: string, password: string) {
    this.userService.signIn$(username, password).subscribe(
      data => {
        // this.userService.setUserLoggedIn();
        this.showSuccessToast('User ' + username + ' Logged In');
        localStorage.setItem('username', data.username);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('token', data.token);
        this.router.navigate(['home']);
      },
      data => {
        console.log();
        this.showErrorToast('Invalid credentials');
      });
  }

  ngAfterViewInit(): void {
    gapi.load('auth2', function () {
      gapi.auth2.init({
        client_id: '608592243393-g1fl4e07qrgkstfph804oo7fb5enssee.apps.googleusercontent.com',
        secret_id: 'AzUQlZvB4w0Cigt0uCkWkTLT',
        redirect_uri: 'postmessage',
        //By default, the fetch_basic_profile parameter of gapi.auth2.init() is set to true, which will automatically add 'email profile openid' as scope.
      });
    });
  }

  public onFacebookClick() {
    // this.router.navigate(['./home']);
    FB.getLoginStatus((response) => {
      console.log(response);
      if (response.status === 'connected') {
        this.router.navigate(['./home']);
      } else {
        FB.login((loginResponse) => {
          console.log(loginResponse);
          this.router.navigate(['./home']);
        });
      }
    });
  }

  async google() {
    const code = await gapi.auth2.getAuthInstance().grantOfflineAccess();
    //const profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
    /*const userInfo = { 
      googleId : profile.getId(),
      username : profile.getFamilyName(),
      name : profile.getName(),
      img : profile.getImageUrl(),
      email : profile.getEmail()
    }*/
    //const googleData = { profile, code };

    this.userService.googleCode$(code).subscribe((data) => {
      //Decode Token and get "username"

      /*const username = profile.getFamilyName();
      const access_token = data.tokens.access_token;
      this.showSuccessToast('User ' + username + ' Logged In');
      localStorage.setItem('username', username);
      localStorage.setItem('userId', profile.get);
      localStorage.setItem('token', data.token);
      this.router.navigate(['home']);
      //this.showSuccessToast('User ' + username + ' Logged In');*/
      console.log(data);
      const access_token = data.access_token;
      this.userService.googleToken$(access_token).subscribe((data) => {
        console.log(data);
        //this.showSuccessToast('User ' + username + ' Logged In');
        localStorage.setItem('username', data.username);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('token', data.token);
        localStorage.setItem('googleToken', data.googleToken);
        this.router.navigate(['home']);
      });
    });
  }
}

