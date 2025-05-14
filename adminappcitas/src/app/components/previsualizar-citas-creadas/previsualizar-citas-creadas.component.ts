import {ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, signal, SimpleChanges} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { Cita } from '../../models/Cita';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-previsualizar-citas-creadas',
  imports: [
    MatExpansionModule,
  ],
  standalone: true,
  templateUrl: './previsualizar-citas-creadas.component.html',
  styleUrl: './previsualizar-citas-creadas.component.css'
})
export class PrevisualizarCitasCreadasComponent {
  panelEstado= signal(false);
  @Input() citas: Cita[] = [];
}

