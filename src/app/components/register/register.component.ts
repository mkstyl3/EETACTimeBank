import {Component, EventEmitter, OnInit, Output, ViewContainerRef} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ToastsManager} from 'ng2-toastr';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';

const url = 'http://localhost:3000/users';
declare const require: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  private title = 'EA Min1';
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
      });
  }

  signUp(name:string, username:string, mail:string, password: string, password2: string ) { // Working
    if (password!=password2)
    {
      console.log("no coinciden");
      this.showErrorToast("Passwords doesn't match");
    }
    else {
            const userData = { name, username, mail, password };
            this.userService.signUp$(userData).subscribe(
        data => {
          this.userService.setUserLoggedIn();
                      this.showSuccessToast('User '+username+' added!');
                      localStorage.setItem('userId', data.userId);
                      localStorage.setItem('token', data.token);
                      this.router.navigate(['home']);
                   },
              data => {
                if (data.status == 400) {
                              this.showErrorToast(data.error.ValidationError); //Joi Validation failed
                            }
                          else if ('SyntaxError' in data) {
                              this.showErrorToast('Syntax Error'); //Joi Validation failed
                            }
                          else this.showErrorToast('This user is already registered');
              });
    }
  }
}
