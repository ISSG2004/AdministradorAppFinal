import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormularioCreacionCitaComponent } from './components/formulario-creacion-cita/formulario-creacion-cita.component';
import { LoginNegociosComponent } from './components/login-negocios/login-negocios.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormularioCreacionCitaComponent,
    LoginNegociosComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Administrador APPO';
  constructor(private router:Router) {}
}
