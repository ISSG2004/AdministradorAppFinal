import { Component } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-formulario-creacion-cita',
  imports: [],
  templateUrl: './formulario-creacion-cita.component.html',
  styleUrl: './formulario-creacion-cita.component.css'
})
export class FormularioCreacionCitaComponent {
  //creando el objeto cita
  //ponemos un calendario en el que seleccionamos fecha de inicio y fecha de fin del rango en el que vamos a crear las citas
  //ponemos un item para seleccionar los horarios de apertura del negocio (ver como hacer para seleccionar el horario en jornada partida)
  //Duración de cita (en minutos)
}
