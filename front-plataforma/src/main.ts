import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app/app.routes';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';
import 'zone.js';  


bootstrapApplication(App, {

  providers: [
    provideRouter(routes),
    provideHttpClient(), 

  ]
});
