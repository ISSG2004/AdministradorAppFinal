import { inject, Injectable } from '@angular/core';
import { Auth, getAuth, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { FirebaseService } from "./firebase.service";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth;
  private router:Router=inject(Router);
  constructor(private firebaseService: FirebaseService) {
    this.auth = getAuth(this.firebaseService.app);
  }

  async login(email: string, password: string) {
    try {
      let userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      if (userCredential.user) {
        //this.router.navigate(['/home']);
        console.log("Inicio de sesión exitoso");
      } else {
        console.log("No se ha podido iniciar sesión");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", (error as any).message);
    }
  }


  logout() {
    return signOut(this.auth);
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}
