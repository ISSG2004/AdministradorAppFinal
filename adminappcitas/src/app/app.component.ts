import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormularioCreacionCitaComponent } from './components/formulario-creacion-cita/formulario-creacion-cita.component';

@Component({
  selector: 'app-root',
  imports: [/*RouterOutlet,*/FormularioCreacionCitaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Administrador APPO';
}
