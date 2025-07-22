import { Routes } from '@angular/router';
import { authGuard } from './core/services/guards/auth-guard/auth-guard';

export const routes: Routes = [
  // ✅ Redirecionamento da raiz para /home
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  // 🏠 Página pública: Home
  {
    path: 'home',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout').then(m => m.MainLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home').then(m => m.Home)
      }
    ]
  },

  // 🔐 Login / Cadastro
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
  },

  // 🔒 Área Protegida: Dashboard e páginas internas
  {
    path: '',
    loadComponent: () =>
      import('./layouts/dashboard-layout/dashboard-layout').then(m => m.DashboardLayout),
    canActivateChild: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard').then(m => m.DashboardComponent)
      },
      {
        path: 'dashboard-course/:courseId',
        loadComponent: () =>
          import('./pages/dashboard-course/dashboard-course').then(m => m.DashboardCourse)
      },
      {
        path: 'my-profile',
        loadComponent: () =>
          import('./pages/my-profile/my-profile').then(m => m.MyProfile)
      }
    ]
  },

  // 🌐 Páginas públicas adicionais
  {
    path: 'em-breve',
    loadComponent: () =>
      import('./shared/components/page-nao-implementada/page-nao-implementada').then(m => m.PageNaoImplementada)
  },
  {
    path: 'payment',
    loadComponent: () =>
      import('./pages/payment/payment').then(m => m.Payment)
  },
  {
    path: 'complaint',
    loadComponent: () =>
      import('./pages/complaint/complaint').then(m => m.Complaint)
  },
  {
    path: 'my-registration',
    loadComponent: () =>
      import('./pages/my-registration/my-registration').then(m => m.MyRegistration)
  },
  {
    path: 'profile-certification',
    loadComponent: () =>
      import('./pages/profile-certification/profile-certification').then(m => m.ProfileCertification)
  },
  {
    path: 'to-sign',
    loadComponent: () =>
      import('./pages/to-sign/to-sign').then(m => m.ToSign)
  },

  // ❗ Rota curinga: redireciona 404 para /home
  {
    path: '**',
    redirectTo: 'home'
  }
];
