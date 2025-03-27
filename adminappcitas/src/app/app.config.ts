import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()), provideFirebaseApp(() => initializeApp({ projectId: "crudrealtimeclase", appId: "1:754438865373:web:d06569ef4d3b2a2f693634", databaseURL: "https://crudrealtimeclase-default-rtdb.europe-west1.firebasedatabase.app", storageBucket: "crudrealtimeclase.firebasestorage.app", apiKey: "AIzaSyAYxsLO5lWFw_ryi3Y-MfIMyeQL8pmmgGM", authDomain: "crudrealtimeclase.firebaseapp.com", messagingSenderId: "754438865373", measurementId: "G-37GWWYHC8Q" })), provideAuth(() => getAuth()), provideDatabase(() => getDatabase())]
};
