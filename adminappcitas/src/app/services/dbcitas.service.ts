import { Injectable } from '@angular/core';
import { Database, DatabaseReference, DataSnapshot, get, getDatabase, onValue, ref, remove, set, update, query, orderByChild, equalTo } from '@angular/fire/database';
import { FirebaseService } from './firebase.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cita } from '../models/Cita';

@Injectable({
  providedIn: 'root'
})
export class DbcitasService {
  private db:any  ;
  private path='/citas';
  private citasSubject = new BehaviorSubject<any[]>([]);
  negocios$ = this.citasSubject.asObservable();

  constructor(private firebaseService: FirebaseService) {
    this.db = getDatabase(this.firebaseService.app);
  }

  async createCita(cita: any): Promise<void> {
    let citaRef = ref(this.db, `${this.path}/${cita.id}`);
    await set(citaRef, cita);
  }

  getCita(citaID: string): Observable<any> {
    let citaRef = ref(this.db, `${this.path}/${citaID}`);
    return new Observable((observer) => {
      onValue(citaRef, (snapshot: DataSnapshot) => {
        if (snapshot.exists()) {
          // Emitimos los datos del negocio en tiempo real cada vez que cambian
          observer.next(snapshot.val());
        } else {
          // Si no hay datos, emitimos null
          observer.next(null);
        }
      },
      (error) => {
        // Si ocurre algún error, lo notificamos
        observer.error(error);
      });
    });
  }

  getCitas(userUID: string): Observable<Cita[]> {
  const citasQuery = query(
    ref(this.db, this.path),
    orderByChild('negocio_id'),
    equalTo(userUID)
  );

  return new Observable((observer) => {
    const unsubscribe = onValue(
      citasQuery,
      (snapshot) => {
        const citas: Cita[] = [];
        snapshot.forEach((childSnapshot) => {
          const data = childSnapshot.val();
          const cita: Cita = {
            id: childSnapshot.key ?? '',
            fecha_cita: data.fecha_cita ?? '',
            estado: data.estado ?? 'disponible',
            usuario_id: data.usuario_id ?? '',
            negocio_id: data.negocio_id ?? '',
          };
          citas.push(cita);
        });
        observer.next(citas);
      },
      (error) => observer.error(error)
    );

    return () => unsubscribe();
  });
}
  async updateCita(cita: Cita): Promise<void> {
    const citaRef = ref(this.db, `${this.path}/${cita.id}`);
    // Actualiza solo los campos que quieras modificar
    await update(citaRef, {
      fecha_cita: cita.fecha_cita,
      estado: cita.estado,
      usuario_id: cita.usuario_id,
      negocio_id: cita.negocio_id
    });
  }

  // Método para eliminar una cita
  async deleteCita(citaID: string): Promise<void> {
    const citaRef = ref(this.db, `${this.path}/${citaID}`);
    await remove(citaRef);
  }

}
