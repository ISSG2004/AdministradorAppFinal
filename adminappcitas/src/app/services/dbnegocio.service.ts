import { Injectable } from '@angular/core';
import { Database, DatabaseReference, DataSnapshot, get, getDatabase, onValue, ref, set } from '@angular/fire/database';
import { FirebaseService } from './firebase.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DBNegocioService {
  private db:any  ;
  private path='/negocios';
  private negociosSubject = new BehaviorSubject<any[]>([]);
  negocios$ = this.negociosSubject.asObservable();

  constructor(private firebaseService: FirebaseService) {
    this.db = getDatabase(this.firebaseService.app);
  }

  async createNegocio(userUID:any,negocio: any): Promise<void> {
    let negocioRef = ref(this.db, `${this.path}/${userUID}`);
    await set(negocioRef, negocio);
  }

  getNegocio(userUID: string): Observable<any> {
    const negocioRef = ref(this.db, `${this.path}/${userUID}`);
    return new Observable((observer) => {
      onValue(negocioRef, (snapshot: DataSnapshot) => {
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

  getNegocios(): Observable<any[]> {
    // Creamos una referencia al nodo que utilizamos
    const negocioRef = ref(this.db, this.path);
    // Devolvemos un Observable que envia los datos en tiempo real
    return new Observable((observer) => {
      // Obtenemos los datos en tiempo real con onValue
      onValue(
        negocioRef,
        (snapshot) => {
          const negocios: any[] = [];
          // Recorremos cada hijo del snapshot para construir la lista de negocios.
          snapshot.forEach((childSnapshot: DataSnapshot) => {
            // Obtenemos los datos del negocio
            const negocio = childSnapshot.val();
            // Agregamos el ID como una propiedad del objeto
            negocio.id = childSnapshot.key;
            // Añadimos el negocio al array
            negocios.push(negocio);
          });
          // eviamos la lista actualizada mediante un subscribe
          observer.next(negocios);
        },
        (error) => {
          console.error("Error al obtener los negocios:", error);
          observer.error(error);
        }
      );
    });
  }
}
