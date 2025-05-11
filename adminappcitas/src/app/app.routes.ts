import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginNegociosComponent } from './components/login-negocios/login-negocios.component';

export const routes: Routes = [
  {
    path: 'Home',
    component: DashboardComponent,
    //añadir canActivate: [AuthGuard] para proteger la ruta
  },{
    path: '',
    component:LoginNegociosComponent
    //añadir canActivate: [NoAuthGuard] para proteger la ruta
  }
];
