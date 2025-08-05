import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  private readonly baseUrl = 'http://localhost:8080/dashboard_admin'; // Ajuste a URL base da sua API

  constructor(private http: HttpClient) { }

  // Método para buscar as estatísticas da dashboard
  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.baseUrl}/stats`);
  }

  // Método para buscar as atividades recentes
  getRecentActivities(): Observable<RecentActivity[]> {
    return this.http.get<RecentActivity[]>(`${this.baseUrl}/activities`);
  }
}
