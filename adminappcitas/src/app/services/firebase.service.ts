import { Injectable } from "@angular/core";
import { initializeApp, FirebaseApp } from "firebase/app";
import { environment } from "../../environments/environment";
import { getDatabase } from 'firebase/database';

@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  public app: FirebaseApp;

  constructor() {
    this.app = initializeApp(environment.firebaseConfig);
  }
  getDatabase() {
    return getDatabase(this.app);
  }
}
