import { Injectable, inject } from '@angular/core';
import { Database, ref, set, update, remove, get, child } from '@angular/fire/database';
import { Auth, getAuth } from '@angular/fire/auth';
import { Negocio } from '../models/Negocio';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataBaseNegocioService {
  private db = inject(Database);
  private auth = inject(Auth);
  private dbPath = '/negocios';

  constructor() {}

  // Obtener todos los negocios (sin reactividad)
  async getAll(): Promise<Negocio[]> {
    const dbRef = ref(this.db, this.dbPath);
    const snapshot = await get(dbRef);
    return snapshot.exists() ? Object.values(snapshot.val()) : [];
  }

  // Obtener todos los negocios (reactivo)
  getAllReactive(): Observable<Negocio[]> {
    const dbRef = ref(this.db, this.dbPath);
    return from(get(dbRef)).pipe(
      map(snapshot => (snapshot.exists() ? Object.values(snapshot.val()) : []))
    );
  }

  // Obtener un negocio por su id sin reactividad
  async getById(id: string): Promise<Negocio | null> {
    const dbRef = ref(this.db, `${this.dbPath}/${id}`);
    const snapshot = await get(dbRef);
    return snapshot.exists() ? snapshot.val() : null;
  }

  // Obtener un negocio por su id con reactividad
  getByIdReactive(id: string): Observable<Negocio | null> {
    const dbRef = ref(this.db, `${this.dbPath}/${id}`);
    return from(get(dbRef)).pipe(
      map(snapshot => (snapshot.exists() ? snapshot.val() : null))
    );
  }

  // Crear un negocio
  async create(negocio: Negocio): Promise<void> {
    const user = this.auth.currentUser;
    if (user) {
      const userId = user.uid;
      const negocioRef = ref(this.db, `${this.dbPath}/${userId}`);
      await set(negocioRef, negocio);
    } else {
      throw new Error('No hay usuario autenticado');
    }
  }

  // Actualizar un negocio
  async update(id: string, data: Partial<Negocio>): Promise<void> {
    const negocioRef = ref(this.db, `${this.dbPath}/${id}`);
    await update(negocioRef, data);
  }

  // Eliminar un negocio por su id
  async delete(id: string): Promise<void> {
    const negocioRef = ref(this.db, `${this.dbPath}/${id}`);
    await remove(negocioRef);
  }

  // Eliminar todos los negocios
  async deleteAll(): Promise<void> {
    const dbRef = ref(this.db, this.dbPath);
    await remove(dbRef);
  }
}
