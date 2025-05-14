import { Injectable } from '@angular/core';
import { Database, DatabaseReference, DataSnapshot, get, getDatabase, onValue, ref, set } from '@angular/fire/database';
import { FirebaseService } from './firebase.service';
import { BehaviorSubject, Observable } from 'rxjs';

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

  getCitas(userUID:any): Observable<any[]> {//buscar como añadir que solo busque las citas que solo coinciden con el id de usuario(uid)
    // Creamos una referencia al nodo que utilizamos
    let citaRef = ref(this.db, this.path);
    // Devolvemos un Observable que envia los datos en tiempo real
    return new Observable((observer) => {
      // Obtenemos los datos en tiempo real con onValue
      onValue(
        citaRef,
        (snapshot) => {
          let citas: any[] = [];
          // Recorremos cada hijo del snapshot para construir la lista de negocios.
          snapshot.forEach((childSnapshot: DataSnapshot) => {
              // Obtenemos los datos del negocio
              let cita = childSnapshot.val();
              //validamos que el id del negocio coincida con el id del usuario
              if (cita.usuario_id === userUID) {
                // Agregamos el ID como una propiedad del objeto
                cita.id = childSnapshot.key;
                citas.push(cita);
              }
            });
          // eviamos la lista actualizada mediante un subscribe
          observer.next(citas);
        },
        (error) => {
          console.error("Error al obtener los negocios:", error);
          observer.error(error);
        }
      );
    });
  }
}
