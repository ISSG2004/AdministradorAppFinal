import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
//firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { firebaseConfig } from './firebase.config';
import { getDatabase, provideDatabase } from '@angular/fire/database';
//material datetima
import { provideNativeDateAdapter } from '@angular/material/core';
import { importProvidersFrom } from '@angular/core';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

registerLocaleData(localeEs);
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideNativeDateAdapter(),
    { provide: LOCALE_ID, useValue: 'es-ES' },
    importProvidersFrom(MatNativeDateModule),
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: LOCALE_ID, useValue: 'es-ES' },
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp({
      projectId: "appo-8d144",
      appId: "1:237782310317:web:920c263dd754df27c85524",
      databaseURL: "https://appo-8d144-default-rtdb.europe-west1.firebasedatabase.app",
      storageBucket: "appo-8d144.firebasestorage.app",
      apiKey: "AIzaSyDPHBDFYyQ-6QRULG8lnMdQyxVZo_at2q8",
      authDomain: "appo-8d144.firebaseapp.com",
      messagingSenderId: "237782310317",
      measurementId: "G-9W21S1H82Y"
    })),
    provideAuth(() => getAuth()), provideDatabase(() => getDatabase()),
  ],
}).catch(err => console.error(err));

