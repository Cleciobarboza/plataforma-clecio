import { CommonModule } from '@angular/common';
import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer/footer';
import { DashboardHeader } from '../../shared/components/dashboard-header/dashboard-header';
import { AuthService } from '../../core/services/auth-service/auth-service';
import { Subscription } from 'rxjs';
import { AdminDashboardService } from '../../core/services/admin-dashboard.service/admin-dashboard.service'; // Verifique se este caminho está certo

// Opcional: Crie interfaces para tipar os dados da dashboard
interface DashboardStats {
  totalUsers: number;
  newUsersLast30Days: number;
  monthlyRevenue: number;
  pendingTasks: number;
}

interface RecentActivity {
  description: string;
  timestamp: string;
}

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, FooterComponent,DashboardHeader],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})

@Injectable({
  providedIn: 'root' 
})
export class AdminDashboard implements OnInit, OnDestroy {
// Propriedades para armazenar os dados da dashboard
  dashboardStats: DashboardStats | null = null;
  recentActivities: RecentActivity[] = [];

  // Variável para armazenar o nome do usuário logado
  userName: string | null = null;
  
  // Inscrito para a mudança do usuário, para evitar vazamento de memória
  private userSubscription: Subscription | undefined;
  
  // Opcional: Variável para controlar o estado de carregamento
  isLoading: boolean = true;
  
  // Opcional: Variável para lidar com erros de carregamento
  hasError: boolean = false;

  constructor(
    private authService: AuthService,
    private adminDashboardService: AdminDashboardService // Injete o serviço
  ) {}

    ngOnInit(): void {
    // ...
    this.userSubscription = this.authService.currentUser.subscribe(user => {
      // Use '??' para garantir que o valor final seja string ou null, nunca undefined
      this.userName = user ? (user.full_name ?? user.email) ?? null : null; 
    });
    // ...
  }
  ngOnDestroy(): void {
    // Cancela a inscrição para evitar vazamentos de memória
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  // Método para carregar todos os dados da dashboard
  loadDashboardData(): void {
    this.isLoading = true;
    this.hasError = false;

    // Exemplo de como você chamaria um serviço para buscar os dados
    // Supondo que o serviço tenha métodos como 'getStats()' e 'getActivities()'
    this.adminDashboardService.getDashboardStats().subscribe({
      next: (stats: DashboardStats) => {
        this.dashboardStats = stats;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Erro ao carregar estatísticas do painel:', err);
        this.hasError = true;
        this.isLoading = false;
      }
    });

    this.adminDashboardService.getRecentActivities().subscribe({
      next: (activities: RecentActivity[]) => {
        this.recentActivities = activities;
      },
      error: (err) => {
        console.error('❌ Erro ao carregar atividades recentes:', err);
        // O erro nas atividades não precisa parar o carregamento da página inteira
        this.hasError = true;
      }
    });
  }

  // Exemplo de um método para atualizar os dados, que poderia ser chamado por um botão
  refreshData(): void {
    this.loadDashboardData();
  }
}

