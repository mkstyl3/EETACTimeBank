import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  
  constructor(private authService: AuthService, private router: Router) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if(req.url.match('users/signin') || req.url.match('users/signup')) {
      const apiReq = req.clone({ 
        url: `http://localhost:3000/${req.url}`
      });
      return next.handle(apiReq);
    }
    
    const authorization = this.authService.getToken();
    const apiReq = req.clone({ 
      url: `http://localhost:3000/${req.url}`
      //headers: req.headers.set('Authorization', authorization) 
    });
    return next.handle(apiReq)
      .catch((error, caught) => {

        if (error.status === 401) {
            //logout users, redirect to login page
            //this.authService.removeTokens();
            this.router.navigate(['/signin']);
            return Observable.throw(error);

        };
        if(error.status === 419){
          return Observable.throw(error);
        }
        return Observable.throw(error);
      });
  }
}

export default APIInterceptor;
