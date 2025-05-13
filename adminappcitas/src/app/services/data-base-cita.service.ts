import { Injectable, inject } from '@angular/core';
import { Database, ref, set, update, remove, get, child, push, onValue } from '@angular/fire/database';
import { Auth } from '@angular/fire/auth';
import { Cita } from '../models/Cita';
import { Observable, from, map, BehaviorSubject } from 'rxjs';
import { FirebaseApp } from '@angular/fire/app';
import { objectVal } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class DataBaseCitaService {
  private db = inject(Database);
  private dbPath = '/citas';

  constructor() {}

  // Obtener todas las citas en tiempo real
  getAll(): Observable<Record<string, Cita>> {
    const dbRef = ref(this.db, this.dbPath);
    return objectVal(dbRef);
  }

  // Obtener una cita por su ID en tiempo real
  getById(id: string): Observable<Cita | null> {
    const dbRef = ref(this.db, `${this.dbPath}/${id}`);
    return objectVal(dbRef);
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
