import { Component } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, Form, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-formulario-creacion-cita',
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOption,
    CommonModule
  ],
  templateUrl: './formulario-creacion-cita.component.html',
  styleUrl: './formulario-creacion-cita.component.css'
})
export class FormularioCreacionCitaComponent {

  //variable para no pasar de step hasta que no se haya rellenado el formulario
  isLinear = true;
  //variables para el formulario reactivo pt1
  primerFormulario!: FormGroup;
  diasSemanaLista: any[] = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  //variable para el formulario reactivo pt2
  segundoFormulario!:FormGroup;
  constructor(private formBuilder: FormBuilder) {}
  //creando el objeto cita
  //ponemos un calendario en el que seleccionamos fecha de inicio y fecha de fin del rango en el que vamos a crear las citas
  //ponemos un item para seleccionar los horarios de apertura del negocio (ver como hacer para seleccionar el horario en jornada partida)
  //Duración de cita (en minutos)
  ngOnInit(){
    //Inicializamos el formulario reactivo pt1
    this.primerFormulario = this.formBuilder.group({
      //añadimos los campos que vamos a añadir en este formulario
      fechaInicio: ['' , Validators.required],
      fechaFin: ['', Validators.required],
      diasLibres: ['', Validators.required],
    });
    //Inicializamos el formulario reactivo pt2
    this.segundoFormulario = this.formBuilder.group({
      //añadimos los campos que vamos a añadir en este formulario
    });
  }
}
