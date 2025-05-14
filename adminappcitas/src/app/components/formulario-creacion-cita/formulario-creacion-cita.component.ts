import { Component, EventEmitter, Output } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, Form, FormGroup, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { PrevisualizarCitasCreadasComponent } from '../previsualizar-citas-creadas/previsualizar-citas-creadas.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { DialogErrorValdiacionComponent } from '../dialogs/dialog-error-valdiacion/dialog-error-valdiacion.component';
import { Cita } from '../../models/Cita';
import { DBNegocioService } from '../../services/dbnegocio.service';
import { DbcitasService } from '../../services/dbcitas.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-formulario-creacion-cita',
  providers: [
    provideNativeDateAdapter(),
    DBNegocioService,
    DbcitasService,AuthService
  ],
  standalone: true,
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
    CommonModule,
    PrevisualizarCitasCreadasComponent,
    MatRadioModule,
    MatTimepickerModule,
    MatDividerModule,
    //DialogErrorValdiacionComponent
  ],
  templateUrl: './formulario-creacion-cita.component.html',
  styleUrl: './formulario-creacion-cita.component.css'
})
export class FormularioCreacionCitaComponent {
enviarDatos() {
throw new Error('Method not implemented.');
}
  //variable para no pasar de step hasta que no se haya rellenado el formulario
  isLinear = true;

  //variables para el formulario reactivo pt1
  primerFormulario!: FormGroup;
  diasSemanaLista: any[] = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  //variable para el formulario reactivo pt2
  segundoFormulario!:FormGroup;
  duracionCitaLista: any[] = ["15m", "20m","30m", "45m", "1h", "1h 30m", "2h"];

  //formulario para las horas de apertura y cierre jornada partida
  formularioHorasJornadaPartida!: FormGroup;

  //formulario para las horas de apertura y cierre jornada completa
  formularioHorasJornadaCompleta!: FormGroup;
  //emiter
  @Output() enviarCitasOut = new EventEmitter<Cita[]>();
  
  citas: Cita[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private dialogo:MatDialog,
    private dbNegocio:DBNegocioService,
    private auth:AuthService,
    private dbCitas:DbcitasService,
  ) {}
  //creando el objeto cita
  //ponemos un calendario en el que seleccionamos fecha de inicio y fecha de fin del rango en el que vamos a crear las citas
  //ponemos un item para seleccionar los horarios de apertura del negocio (ver como hacer para seleccionar el horario en jornada partida)
  //Duración de cita (en minutos)
  ngOnInit(){
    //Inicializamos el formulario reactivo pt1
    this.primerFormulario = this.formBuilder.group({
      //añadimos los campos que vamos a añadir en este formulario
      fechaInicio: ['' , [Validators.required, this.validarFechaInicio()]],
      fechaFin: ['', Validators.required],
      diasLibres: ['',],
    });
    //Inicializamos el formulario reactivo pt2 y en función del tipo de jornada que seleccionemos, se valida un formulario u otro
    // Inicialización del FormGroup
    this.segundoFormulario = this.formBuilder.group({
      tipoJornada: ['', Validators.required],
      formularioHorasJornadaPartida: this.formBuilder.group({
        aperturaManana: [''],
        cierreManana: [''],
        aperturaTarde: [''],
        cierreTarde: [''],
      }),
      formularioHorasJornadaCompleta: this.formBuilder.group({
        apertura: [''],
        cierre: [''],
      }),
      duracionCita: ['', Validators.required],
    });
    const jornadaCompletaGroup = this.segundoFormulario.get('formularioHorasJornadaCompleta') as FormGroup;
    const jornadaPartidaGroup = this.segundoFormulario.get('formularioHorasJornadaPartida') as FormGroup;
    // Desactivar ambos grupos al inicio
    this.segundoFormulario.get('formularioHorasJornadaPartida')?.disable();
    this.segundoFormulario.get('formularioHorasJornadaCompleta')?.disable();

    // Manejar los cambios en el tipo de jornada
    this.segundoFormulario.get('tipoJornada')?.valueChanges.subscribe((tipo) => {
      if (tipo === 'jornadaPartida') {
        this.segundoFormulario.get('formularioHorasJornadaCompleta')?.disable();
        jornadaCompletaGroup.clearValidators();
        this.segundoFormulario.get('formularioHorasJornadaPartida')?.enable();
        jornadaPartidaGroup.get('aperturaManana')?.setValidators([Validators.required]);
        jornadaPartidaGroup.get('cierreManana')?.setValidators([Validators.required]);
        jornadaPartidaGroup.get('aperturaTarde')?.setValidators([Validators.required]);
        jornadaPartidaGroup.get('cierreTarde')?.setValidators([Validators.required]);
        jornadaPartidaGroup.setValidators(this.horaAperturaAntesQueCierreJornadaPartidaValidator());
        jornadaPartidaGroup.updateValueAndValidity();
      } else if (tipo === 'jornadaContinua') {
        this.segundoFormulario.get('formularioHorasJornadaPartida')?.disable();
        jornadaPartidaGroup.clearValidators();
        this.segundoFormulario.get('formularioHorasJornadaCompleta')?.enable();
        jornadaCompletaGroup.get('apertura')?.setValidators([Validators.required]);
        jornadaCompletaGroup.get('cierre')?.setValidators([Validators.required]);
        jornadaCompletaGroup.setValidators(this.horaAperturaAntesQueCierreJornadaCompletaValidator());
        jornadaCompletaGroup.updateValueAndValidity();
      }
      // Actualizar el estado del formulario completo
      this.segundoFormulario.updateValueAndValidity();
    });
  }
  procesarFormularios(){
    //si el primer formulario es valido, se procesa el segundo formulario
    if(this.primerFormulario.valid && this.segundoFormulario.valid){
      //console.log(this.calcularCitas(this.primerFormulario.value, this.segundoFormulario.value));
      this.calcularCitas(this.primerFormulario.value, this.segundoFormulario.value).forEach(cita => {
        let citaCreada = {
          id: cita.fecha_cita,
          fecha_cita: cita.fecha_cita,
          negocio_id: this.auth.getCurrentUser()?.uid,
          usuario_id: 0,
          estado: "disponible"
        }
        console.log(citaCreada);
      });
      //this.dbCitas.createCita(this.calcularCitas(this.primerFormulario.value, this.segundoFormulario.value))
      alert("Formulario enviado correctamente")
    }else{
      this.dialogo.open(DialogErrorValdiacionComponent)
    }
  }
  conversionDuracionCita(duracion:any): number {
    switch (duracion) {
      case "15m":
        return 15;
      case "20m":
        return 20;
      case "30m":
        return 30;
      case "45m":
        return 45;
      case "1h":
        return 60;
      case "1h 30m":
        return 90;
      case "2h":
        return 120;
      default:
        return 0;
    }
  }
  horaAperturaAntesQueCierreJornadaCompletaValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const aperturaCtrl = group.get('apertura');
      const cierreCtrl = group.get('cierre');

      const apertura: Date = new Date(aperturaCtrl?.value);
      const cierre: Date = new Date(cierreCtrl?.value);

      if (!aperturaCtrl || !cierreCtrl || !apertura || !cierre) return null;

      // Resetear errores previos
      aperturaCtrl.setErrors(null);
      cierreCtrl.setErrors(null);

      if (apertura >= cierre) {
        aperturaCtrl.setErrors({ horaInvalida: true });
        cierreCtrl.setErrors({ horaInvalida: true });
        return { horaInvalida: true };
      }

      return null;
    };
  }

  horaAperturaAntesQueCierreJornadaPartidaValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const aperturaMananaCtrl = group.get('aperturaManana');
      const cierreMananaCtrl = group.get('cierreManana');
      const aperturaTardeCtrl = group.get('aperturaTarde');
      const cierreTardeCtrl = group.get('cierreTarde');

      const aperturaManana: Date = new Date(aperturaMananaCtrl?.value);
      const cierreManana: Date = new Date(cierreMananaCtrl?.value);
      const aperturaTarde: Date = new Date(aperturaTardeCtrl?.value);
      const cierreTarde: Date = new Date(cierreTardeCtrl?.value);

      if (!aperturaManana || !cierreManana || !aperturaTarde || !cierreTarde) return null;

      // Resetear errores previos
      aperturaMananaCtrl?.setErrors(null);
      cierreMananaCtrl?.setErrors(null);
      aperturaTardeCtrl?.setErrors(null);
      cierreTardeCtrl?.setErrors(null);

      let hasError = false;
      if (aperturaManana >= cierreManana) {
        aperturaMananaCtrl?.setErrors({ horarioMananaInvalido: true });
        cierreMananaCtrl?.setErrors({ horarioMananaInvalido: true });
        hasError = true;
      }
      if (aperturaTarde >= cierreTarde) {
        aperturaTardeCtrl?.setErrors({ horarioTardeInvalido: true });
        cierreTardeCtrl?.setErrors({ horarioTardeInvalido: true });
        hasError = true;
      }
      if (cierreManana >= aperturaTarde) {
        cierreMananaCtrl?.setErrors({ intervaloInvalido: true });
        aperturaTardeCtrl?.setErrors({ intervaloInvalido: true });
        hasError = true;
      }
      return hasError ? { horarioInvalido: true } : null;
    };
  }

  validarFechaInicio(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const rawValue = control.value;
      if (!rawValue) return null;
      const fechaInicio = new Date(rawValue);
      if (isNaN(fechaInicio.getTime())) return { fechaInvalida: true }; // Por si no es una fecha válida
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      fechaInicio.setHours(0, 0, 0, 0);
      if (fechaInicio < hoy) {
        return { fechaInvalida: true };
      }
      return null;
    };
  }
  //crear metodo para valdiar formularios y si no valida que no se pueda pasar el step 3 ni 4
  calcularCitas(primerFormulario: any, segundoFormulario: any): Cita[] {
    let citas: Cita[] = [];

    let fechaInicio = new Date(primerFormulario.fechaInicio);
    let fechaFin = new Date(primerFormulario.fechaFin);
    fechaFin.setHours(23, 59, 59, 999); // Aseguramos incluir el último día completo

    // Aseguramos que los días libres estén en número
    let diasLibres: number[] = [];

    // Mapa de días de la semana en texto a números
    let diasSemanaMap: { [key: string]: number } = {
      'Domingo': 0,
      'Lunes': 1,
      'Martes': 2,
      'Miércoles': 3,
      'Jueves': 4,
      'Viernes': 5,
      'Sábado': 6
    };
    if (Array.isArray(primerFormulario.diasLibres)) {
      diasLibres = primerFormulario.diasLibres
        .map((d: string) => diasSemanaMap[d.trim()])
        .filter((d: number) => !isNaN(d) && d >= 0 && d <= 6);  // Validamos que el día esté en el rango [0-6]
    } else {
      console.error('El formato de días libres no es válido.');
    }
    let duracionCitaMin = this.conversionDuracionCita(segundoFormulario.duracionCita);
    let tipoJornada = segundoFormulario.tipoJornada;

    // Bucle día a día
    for (
      let d = new Date(fechaInicio);
      d <= fechaFin;
      d.setDate(d.getDate() + 1)
    ) {
      let diaActual = new Date(d);
      let diaSemana = diaActual.getDay();

      // Verificamos si este día es libre antes de continuar
      if (diasLibres.includes(diaSemana)) {
        continue;
      }
      if (tipoJornada === 'jornadaContinua') {
        let apertura = new Date(segundoFormulario.formularioHorasJornadaCompleta.apertura);
        let cierre = new Date(segundoFormulario.formularioHorasJornadaCompleta.cierre);

        if (isNaN(apertura.getTime()) || isNaN(cierre.getTime())) continue;

        let inicioDia = new Date(diaActual);
        inicioDia.setHours(apertura.getHours(), apertura.getMinutes(), 0, 0);

        let finDia = new Date(diaActual);
        finDia.setHours(cierre.getHours(), cierre.getMinutes(), 0, 0);

        for (
          let horaCita = new Date(inicioDia);
          horaCita < finDia;
          horaCita.setMinutes(horaCita.getMinutes() + duracionCitaMin)
        ) {
          const cita = new Cita();
          cita.fecha_cita = this.formatearFechaLocalISO(horaCita);
          citas.push(cita);
        }
      }

      if (tipoJornada === 'jornadaPartida') {
        let form = segundoFormulario.formularioHorasJornadaPartida;

        let tramos = [
          [new Date(form.aperturaManana), new Date(form.cierreManana)],
          [new Date(form.aperturaTarde), new Date(form.cierreTarde)],
        ];

        for (let [apertura, cierre] of tramos) {
          if (isNaN(apertura.getTime()) || isNaN(cierre.getTime())) continue;

          let inicioTramo = new Date(diaActual);
          inicioTramo.setHours(apertura.getHours(), apertura.getMinutes(), 0, 0);

          let finTramo = new Date(diaActual);
          finTramo.setHours(cierre.getHours(), cierre.getMinutes(), 0, 0);

          for (
            let horaCita = new Date(inicioTramo);
            horaCita < finTramo;
            horaCita.setMinutes(horaCita.getMinutes() + duracionCitaMin)
          ) {
            let cita = new Cita();
            cita.fecha_cita = this.formatearFechaLocalISO(horaCita);
            citas.push(cita);
          }
        }
      }
    }

    return citas;
  }
  formatearFechaLocalISO(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:00`;
  }


  enviarCitas(){
    // Aquí calculamos las citas usando los valores de los formularios
    this.citas = this.calcularCitas(this.primerFormulario.value, this.segundoFormulario.value);
    this.enviarCitasOut.emit(this.citas);
  }
}

