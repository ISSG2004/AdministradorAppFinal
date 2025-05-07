import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { firebaseConfig } from './firebase.config';
import { getDatabase, provideDatabase } from '@angular/fire/database';

bootstrapApplication(AppComponent, {
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({ projectId: "appo-8d144", appId: "1:237782310317:web:920c263dd754df27c85524", databaseURL: "https://appo-8d144-default-rtdb.europe-west1.firebasedatabase.app", storageBucket: "appo-8d144.firebasestorage.app", apiKey: "AIzaSyDPHBDFYyQ-6QRULG8lnMdQyxVZo_at2q8", authDomain: "appo-8d144.firebaseapp.com", messagingSenderId: "237782310317", measurementId: "G-9W21S1H82Y" })), provideAuth(() => getAuth()), provideDatabase(() => getDatabase()),
  ],
}).catch(err => console.error(err));

