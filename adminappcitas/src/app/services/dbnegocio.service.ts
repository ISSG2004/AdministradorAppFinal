import { Injectable } from '@angular/core';
import { Database, getDatabase, ref, set } from '@angular/fire/database';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class DBNegocioService {
  private db:any  ;
  private path='/negocios';

  constructor(private firebaseService: FirebaseService) {
    this.db = getDatabase(this.firebaseService.app);
  }

  async createNegocio(userUID:any,negocio: any): Promise<void> {
    let negocioRef = ref(this.db, `${this.path}/${userUID}`);
    await set(negocioRef, negocio);
  }

}
