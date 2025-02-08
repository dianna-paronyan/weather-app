import { Routes } from '@angular/router';
import {ViewsComponent} from "./views/views.component";
import {DashboardComponent} from "./views/dashboard/dashboard.component";
import {MultiStepFormComponent} from "./views/multi-step-form/multi-step-form.component";

export const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {
    path: '',
    component: ViewsComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'multi-step',
        component: MultiStepFormComponent,
      }
    ]
  }

];
