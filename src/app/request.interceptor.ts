import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BackendService } from './backend.service';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(public auth: BackendService, private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = {};
    if (this.router.url !== '/login') {
      headers = {
        Authorization: `JWT ${this.auth.getToken()}`
      };
    }
    request = request.clone({
      setHeaders: headers
    });
    return next.handle(request).pipe(tap(() => { },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login']);
          } else if (err.status === 500) {
         /*    alert('algo mal ha ocurrido') */
          } else {
            return;
          }
        }
      }));
  }
}