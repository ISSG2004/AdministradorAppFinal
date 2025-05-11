import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginNegociosComponent } from './components/login-negocios/login-negocios.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginNegociosComponent
  },
  {
    path: 'home',
    component: DashboardComponent
  }
];

