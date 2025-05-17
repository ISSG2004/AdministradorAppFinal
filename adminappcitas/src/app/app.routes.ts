import { Form } from '@angular/forms';
import { NoAuthGuard } from './Guards/noauth.guard';
import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginNegociosComponent } from './components/login-negocios/login-negocios.component';
import { AuthGuard } from './Guards/auth.guard';
import { FormularioCreacionCitaComponent } from './components/formulario-creacion-cita/formulario-creacion-cita.component';
import { CitasNegocioComponent } from './components/citas-negocio/citas-negocio.component';

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
    path: '',
    component: DashboardComponent, // Componente que contiene el Sidenav
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: CitasNegocioComponent
      },
      {
        path: 'crearCitas',
        component: FormularioCreacionCitaComponent
      }
    ]
  }
];


