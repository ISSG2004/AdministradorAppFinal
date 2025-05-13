import { Injectable } from '@angular/core';
import { Auth, getAuth, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { FirebaseService } from "./firebase.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth;
  constructor(private firebaseService: FirebaseService) {
    this.auth = getAuth(this.firebaseService.app);
  }
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}
