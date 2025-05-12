import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser = new BehaviorSubject<User | null>(null);
  user$ = this.currentUser.asObservable();

  // Usar inject para obtener auth solo cuando sea necesario
  private auth = getAuth();

  constructor() {
    // Monitoreamos el estado de la autenticación
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser.next(user);
    });
  }

  // Iniciar sesión
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password).catch((error) => {
      console.error('Error de inicio de sesión:', error);
      throw this.getFirebaseErrorMessage(error);
    });
  }

  // Registrar usuario
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).catch((error) => {
      console.error('Error de registro:', error);
      throw this.getFirebaseErrorMessage(error);
    });
  }

  // Cerrar sesión
  logout() {
    return signOut(this.auth).catch((error) => {
      console.error('Error al cerrar sesión:', error);
      throw this.getFirebaseErrorMessage(error);
    });
  }

  // Obtener el usuario actual (sincrónico)
  getCurrentUser() {
    return this.currentUser.value;
  }

  // Manejo de errores de Firebase
  private getFirebaseErrorMessage(error: any): string {
    switch (error.code) {
      case 'auth/user-not-found':
        return 'El usuario no fue encontrado.';
      case 'auth/wrong-password':
        return 'La contraseña es incorrecta.';
      case 'auth/email-already-in-use':
        return 'El correo electrónico ya está en uso.';
      default:
        return 'Ocurrió un error desconocido. Intenta nuevamente.';
    }
  }
}
