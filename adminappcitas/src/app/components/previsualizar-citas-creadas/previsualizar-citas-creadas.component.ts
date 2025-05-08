import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
@Component({
  selector: 'app-previsualizar-citas-creadas',
  imports: [
    MatExpansionModule,
  ],
  templateUrl: './previsualizar-citas-creadas.component.html',
  styleUrl: './previsualizar-citas-creadas.component.css'
})
export class PrevisualizarCitasCreadasComponent {
  panelEstado= signal(false);
}
