import { Injectable, inject } from '@angular/core';
import { Database, ref, set, update, remove, get, child, push } from '@angular/fire/database';
import { Auth } from '@angular/fire/auth';
import { Cita } from '../models/Cita';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataBaseCitaService {
  private db = inject(Database);
  private auth = inject(Auth);
  private dbPath = '/citas';

  constructor() {}

  // Obtener todas las citas (sin reactividad)
  async getAll(): Promise<Cita[]> {
    const dbRef = ref(this.db, this.dbPath);
    const snapshot = await get(dbRef);
    return snapshot.exists() ? Object.values(snapshot.val()) : [];
  }

  // Obtener todas las citas (reactivo)
  getAllReactive(): Observable<Cita[]> {
    const dbRef = ref(this.db, this.dbPath);
    return from(get(dbRef)).pipe(
      map(snapshot => (snapshot.exists() ? Object.values(snapshot.val()) : []))
    );
  }

  // Obtener una cita por su ID (sin reactividad)
  async getById(id: string): Promise<Cita | null> {
    const dbRef = ref(this.db, `${this.dbPath}/${id}`);
    const snapshot = await get(dbRef);
    return snapshot.exists() ? snapshot.val() : null;
  }

  // Obtener una cita por su ID (reactivo)
  getByIdReactive(id: string): Observable<Cita | null> {
    const dbRef = ref(this.db, `${this.dbPath}/${id}`);
    return from(get(dbRef)).pipe(
      map(snapshot => (snapshot.exists() ? snapshot.val() : null))
    );
  }

  // Crear una nueva cita
  async create(cita: Cita): Promise<void> {
    const citasRef = ref(this.db, this.dbPath);
    const newCitaRef = push(citasRef);
    await set(newCitaRef, cita);
  }

  // Actualizar una cita
  async update(id: string, data: Partial<Cita>): Promise<void> {
    const citaRef = ref(this.db, `${this.dbPath}/${id}`);
    await update(citaRef, data);
  }

  // Eliminar una cita por su ID
  async delete(id: string): Promise<void> {
    const citaRef = ref(this.db, `${this.dbPath}/${id}`);
    await remove(citaRef);
  }

  // Eliminar todas las citas
  async deleteAll(): Promise<void> {
    const dbRef = ref(this.db, this.dbPath);
    await remove(dbRef);
  }
}

