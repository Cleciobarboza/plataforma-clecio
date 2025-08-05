import { Routes } from '@angular/router';

export const routes: Routes = [
  // 🏠 ROTA: Landing Page (Home)
  {
    path: '',
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

 // ROTA: Dashboard (com layout exclusivo)
  {
    path: '',
    loadComponent: () =>
      import('./layouts/dashboard-layout/dashboard-layout').then(m => m.DashboardLayout),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard').then(m => m.DashboardComponent)
      },
      {
        path: 'dashboard-course/:courseId',
        loadComponent: () => import('./pages/dashboard-course/dashboard-course').then(m => m.DashboardCourse)
      },


       {
        path: 'my-profile',
        loadComponent: () =>
          import('./pages/my-profile/my-profile').then(m => m.MyProfile)
      },
      
      
    
      
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
  },

  // Rota: page não inplementada
  {
     path: 'em-breve',
     loadComponent: () => import('./shared/components/page-nao-implementada/page-nao-implementada').then(m => m.PageNaoImplementada)
  },
  {
     path: 'payment',
     loadComponent: () => import('./pages/payment/payment').then(m => m.Payment)
  },
   {
     path: 'complaint',
     loadComponent: () => import('./pages/complaint/complaint').then(m => m.Complaint)
  },
   {
     path: 'my-registration',
     loadComponent: () => import('./pages/my-registration/my-registration').then(m => m.MyRegistration)
  },
   {
     path: 'profile-certification',
     loadComponent: () => import('./pages/profile-certification/profile-certification').then(m => m.ProfileCertification)
  },
  {
  path: 'to-sign',
  loadComponent: () =>
    import('./pages/to-sign/to-sign').then(m => m.ToSign)
  },
  {
  path: 'admin-dashboard',
  loadComponent: () =>
    import('./pages/admin-dashboard/admin-dashboard').then(m => m.AdminDashboard)
  }



];
