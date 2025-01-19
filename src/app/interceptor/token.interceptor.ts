import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const clonedRequest = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))  
    });

    return next.handle(clonedRequest).pipe(
      tap((event) => {
        if(event instanceof HttpResponse) {}
      }),
      catchError((error) => {
        throw error;
      })
    );
  }
}
