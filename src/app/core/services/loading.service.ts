import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.isLoading.asObservable();
  show(): void {
    this.isLoading.next(true);
  }
  hide(): void {
    this.isLoading.next(false);
  }
}
