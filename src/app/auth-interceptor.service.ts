import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('this is interceptor');
    console.log(req.url);
    const requestHeader = req.clone({
      headers: req.headers.append('auth', 'xyz')
    });
    return next.handle(requestHeader)
  }
}
