import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideFirebaseApp(() => initializeApp(
      {
        projectId: "appo-8d144",
        appId: "1:237782310317:web:920c263dd754df27c85524",
        databaseURL: "https://appo-8d144-default-rtdb.europe-west1.firebasedatabase.app",
        messagingSenderId: "237782310317",
        measurementId: "G-9W21S1H82Y"
      }
    )),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase())]
};
