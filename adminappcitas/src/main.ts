import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';


// Material Datepicker
import { provideNativeDateAdapter } from '@angular/material/core';
import { importProvidersFrom } from '@angular/core';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

// Registrar el idioma español
registerLocaleData(localeEs);

// Inicializar la aplicación de Angular
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideNativeDateAdapter(),
    { provide: LOCALE_ID, useValue: 'es-ES' },
    importProvidersFrom(MatNativeDateModule),
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    provideAnimations(),
  ],
}).catch((err) => console.error(err));
