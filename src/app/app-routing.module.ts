import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComparatorComponent } from './comparator/comparator.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PredictorComponent } from './predictor/predictor.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "",
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: 'predictor',
        component: PredictorComponent
      },
      {
        path: 'comparator',
        component: ComparatorComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
