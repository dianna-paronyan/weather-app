import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private hasErrorBeenShown: boolean = false;

  constructor(private messageService: MessageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (!this.hasErrorBeenShown) {
          this.hasErrorBeenShown = true;
          let errorMessage = 'An unknown error occurred';

          if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
          } else {
            switch (error.status) {
              case 404:
                errorMessage = 'Resource not found';
                break;
              case 401:
                errorMessage = 'Unauthorized access';
                break;
              case 500:
                errorMessage = 'Internal server error';
                break;
              case 0:
                errorMessage = 'Network error. Please check your internet connection.';
                break;
              default:
                errorMessage = `Error ${error.status}: ${error.message}`;
            }
          }

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: errorMessage,
          });

          setTimeout(() => (this.hasErrorBeenShown = false), 3000);
        }

        return throwError(() => new Error(error.message));
      })
    );
  }
}
