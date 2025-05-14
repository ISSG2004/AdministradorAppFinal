import {ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, signal, SimpleChanges} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { Cita } from '../../models/Cita';
import { Subscription } from 'rxjs';
import { CitasPrevisualizadasService } from '../../services/citas-previsualizadas.service';
@Component({
  selector: 'app-previsualizar-citas-creadas',
  imports: [
    MatExpansionModule,
  ],
  standalone: true,
  templateUrl: './previsualizar-citas-creadas.component.html',
  styleUrl: './previsualizar-citas-creadas.component.css'
})
export class PrevisualizarCitasCreadasComponent implements OnInit, OnDestroy {
  panelEstado= signal(false);
  citas: Cita[] = [];
  private subscription: Subscription = new Subscription;
  constructor(private citasService: CitasPrevisualizadasService) {}
  ngOnInit() {
    // Suscribirse a cambios en las citas
    this.subscription = this.citasService.citas$.subscribe((citas) => {
      this.citas = citas;
      console.log("Citas recibidas:", citas);
    });
  }

  ngOnDestroy() {
    // Importante: Cancelar suscripción para evitar fugas de memoria
    this.subscription.unsubscribe();
  }

  eliminarCita(index: number) {
    const citasActuales = this.citasService.getCitasActuales();
    citasActuales.splice(index, 1);
    this.citasService.actualizarCitas([...citasActuales]); // Emitir nuevo array
  }
}

