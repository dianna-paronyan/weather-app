import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../shared/components/header/header.component";
import {RouterOutlet} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {LoadingService} from "../core/services/loading.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {LoadingComponent} from "../shared/components/loading/loading.component";

@Component({
  selector: 'app-views',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    AsyncPipe,
    NgIf,
    LoadingComponent
  ],
  templateUrl: './views.component.html',
  styleUrl: './views.component.scss'
})
export class ViewsComponent {

}
