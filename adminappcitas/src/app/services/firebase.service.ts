import { Injectable } from "@angular/core";
import { initializeApp, FirebaseApp } from "firebase/app";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  public app: FirebaseApp;

  constructor() {
    this.app = initializeApp(environment.firebaseConfig);
    console.log("Firebase initialized:", this.app);
  }
}
