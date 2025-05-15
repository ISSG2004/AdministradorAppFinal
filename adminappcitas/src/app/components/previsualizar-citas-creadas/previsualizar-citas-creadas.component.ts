import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, signal, SimpleChanges} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { Cita } from '../../models/Cita';
import { MatCardModule } from '@angular/material/card';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-previsualizar-citas-creadas',
  imports: [
    MatExpansionModule,
    CommonModule,
    MatCardModule,
  ],
  standalone: true,
  templateUrl: './previsualizar-citas-creadas.component.html',
  styleUrl: './previsualizar-citas-creadas.component.css'
})
export class PrevisualizarCitasCreadasComponent{
  panelEstado= signal(false);
  @Input() citas: Cita[] = [];
  @Output() citasActualizadas = new EventEmitter<any[]>();
  citasAgrupadas: { [key: string]: any[] } = {};
  fechas: string[] = [];

  constructor () {}
  ngOnChanges(changes: SimpleChanges) {
    console.log('Citas recibidas del padre:', this.citas);
    if(this.citas.length>0){
      this.citasAgrupadas = this.agruparCitasPorDia(this.citas);
      console.log('Citas agrupadas:', this.citasAgrupadas);
    }
      //ver como hacer la logica para agrupar las citas en cada desplegable las de un día
  }
  eliminarCita(cita: Cita) {
    const index = this.citas.indexOf(cita);
    if (index !== -1) {
      this.citas.splice(index, 1);
      this.citasActualizadas.emit(this.citas);
    }
  }
  agruparCitasPorDia(citas: any[]): { [key: string]: any[] } {
    return citas.reduce((acc: { [key: string]: any[] }, cita) => {
      // Verificar si la fecha es válida
      const fechaCita = new Date(cita.fecha_cita);
      if (isNaN(fechaCita.getTime())) {
        console.warn(`Fecha inválida encontrada: ${cita.fecha_cita}`);
        return acc; // Saltar esta cita
      }
      const fecha = fechaCita.toISOString().split('T')[0];
      if (!acc[fecha]) {
        acc[fecha] = [];
      }
      acc[fecha].push(cita);
      return acc;
    }, {});
  }
}

