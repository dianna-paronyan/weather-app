import {Component, OnInit} from '@angular/core';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {Observable} from "rxjs";
import {LoadingService} from "../../../core/services/loading.service";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    ProgressSpinnerModule,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent implements OnInit {
  loading$!: Observable<boolean>;

  constructor(private loaderService: LoadingService) {
  }

  ngOnInit(): void {
    this.loading$ = this.loaderService.loading$;
  }
}
