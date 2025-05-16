import { Form } from '@angular/forms';
import { NoAuthGuard } from './Guards/noauth.guard';
import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginNegociosComponent } from './components/login-negocios/login-negocios.component';
import { AuthGuard } from './Guards/auth.guard';
import { FormularioCreacionCitaComponent } from './components/formulario-creacion-cita/formulario-creacion-cita.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginNegociosComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'home',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'crearCitas',
    component: FormularioCreacionCitaComponent,
    canActivate: [AuthGuard]
  }
];

