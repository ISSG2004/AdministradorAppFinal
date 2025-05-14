import { NoAuthGuard } from './Guards/noauth.guard';
import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginNegociosComponent } from './components/login-negocios/login-negocios.component';
import { AuthGuard } from './Guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginNegociosComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: DashboardComponent,
    //canActivate: [AuthGuard]
  }
];

