import { Routes } from '@angular/router';

export const routes: Routes = [
  // Rotas de autenticação com AuthLayout
  {
    path: '',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout').then(m => m.AuthLayoutComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/auth/auth').then(m => m.Auth)
      }
    ]
  },

  // Rotas do sistema principal com MainLayout
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout').then(m => m.MainLayoutComponent),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home').then(m => m.Home)
      }
    ]
  }
];
