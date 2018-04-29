import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
// add the token
    const apiReq = req.clone({ url: `http://localhost:3000/${req.url}` });
    return next.handle(apiReq);
  }
}

export default APIInterceptor;
