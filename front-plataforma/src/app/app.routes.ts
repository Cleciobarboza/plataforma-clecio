import { Routes } from '@angular/router';

export const routes: Routes = [
  // ROTA: Landing Page (com layout principal)
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout').then(m => m.MainLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home').then(m => m.Home)
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard').then(m => m.DashboardComponent)
      }
    ]
  },

  // ROTA: Autenticação (login e cadastro)
  {
    path: '',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout').then(m => m.AuthLayoutComponent),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/auth/auth').then(m => m.Auth)
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/auth/auth').then(m => m.Auth)
      }
    ]
  }
];
