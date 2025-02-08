import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {delay, finalize, Observable} from "rxjs";
import {LoadingService} from "../services/loading.service";


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoadingService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    return next.handle(req).pipe(
      finalize(() => {
        this.loaderService.hide();
      })
    );
  }


}
