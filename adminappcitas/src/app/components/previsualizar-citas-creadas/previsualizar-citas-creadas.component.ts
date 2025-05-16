import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Cita } from '../../models/Cita';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-previsualizar-citas-creadas',
  imports: [
    MatExpansionModule,
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  standalone: true,
  templateUrl: './previsualizar-citas-creadas.component.html',
  styleUrl: './previsualizar-citas-creadas.component.css'
})
export class PrevisualizarCitasCreadasComponent implements OnChanges {
  panelEstado = signal(false);

  @Input() citas: Cita[] = [];
  @Output() citasActualizadas = new EventEmitter<Cita[]>();

  citasAgrupadas: { [key: string]: Cita[] } = {};
  fechas: string[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['citas'] && this.citas && this.citas.length > 0) {
      this.citasAgrupadas = this.agruparCitasPorDia(this.citas);
      this.fechas = Object.keys(this.citasAgrupadas).sort();
      console.log('Citas agrupadas:', this.citasAgrupadas);
    } else {
      this.citasAgrupadas = {};
      this.fechas = [];
    }
  }

  eliminarCita(cita: Cita) {
    const index = this.citas.indexOf(cita);
    if (index !== -1) {
      this.citas.splice(index, 1);
      this.citasActualizadas.emit(this.citas);
      // Recalcular agrupación y fechas tras eliminar
      this.citasAgrupadas = this.agruparCitasPorDia(this.citas);
      this.fechas = Object.keys(this.citasAgrupadas).sort();
    }
  }

  agruparCitasPorDia(citas: Cita[]): { [key: string]: Cita[] } {
    return citas.reduce((acc: { [key: string]: Cita[] }, cita) => {
      const fechaCita = new Date(cita.fecha_cita);
      if (isNaN(fechaCita.getTime())) {
        console.warn(`Fecha inválida: ${cita.fecha_cita}`);
        return acc;
      }
      const fecha = `${fechaCita.getFullYear()}-${(fechaCita.getMonth() + 1).toString().padStart(2, '0')}-${fechaCita.getDate().toString().padStart(2, '0')}`;

      if (!acc[fecha]) {
        acc[fecha] = [];
      }
      acc[fecha].push(cita);
      return acc;
    }, {});
  }
}
