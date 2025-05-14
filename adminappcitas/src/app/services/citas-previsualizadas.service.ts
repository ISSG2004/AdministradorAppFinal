import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cita } from '../models/Cita';

@Injectable({
  providedIn: 'root'
})
export class CitasPrevisualizadasService {
  private _citas = new BehaviorSubject<Cita[]>([]);

  // Observable público para suscribirse
  public citas$: Observable<Cita[]> = this._citas.asObservable();
  constructor() { }
  actualizarCitas(nuevasCitas: Cita[]) {
    this._citas.next(nuevasCitas);
  }
  
  getCitasActuales(): Cita[] {
    return this._citas.value;
  }
}
