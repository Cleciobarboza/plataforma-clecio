import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { App } from './app/app';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import 'zone.js';
import { AuthInterceptor } from './app/core/services/auth-interceptor/auth-interceptor';

bootstrapApplication(App, {
providers: [
provideRouter(routes),
provideHttpClient(
withInterceptors([
AuthInterceptor 
])
)
]
});