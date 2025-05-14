import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, signal, SimpleChanges} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { Cita } from '../../models/Cita';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-previsualizar-citas-creadas',
  imports: [
    MatExpansionModule, CommonModule
  ],
  standalone: true,
  templateUrl: './previsualizar-citas-creadas.component.html',
  styleUrl: './previsualizar-citas-creadas.component.css'
})
export class PrevisualizarCitasCreadasComponent{
  panelEstado= signal(false);
  @Input() citas: Cita[] = [];
  constructor (private cdr: ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['citas']) {
      console.log("Citas actualizadas:", changes['citas'].currentValue);
      this.cdr.detectChanges();  // Solo es necesario si Angular no está detectando los cambios automáticamente
    }
  }

}

