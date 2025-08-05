import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FooterComponent } from '../../shared/components/footer/footer';
import { CourseCard } from '../../shared/components/course-card/course-card';
import { FreeCards } from '../../shared/components/free-cards/free-cards';
import { LastWatchedCard } from '../../shared/components/last-watched-card/last-watched-card';

import { UsuarioLogadoDTO } from '../../shared/models/usuario-logado.dto';
import { AuthService } from '../../core/services/auth-service/auth-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CourseCard,
    FooterComponent,
    FreeCards,
    LastWatchedCard
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  usuarioLogado: UsuarioLogadoDTO | null = null;
  temAcesso: boolean = false;
  userImageUrl: string | null = null;
  currentBannerImage: string = '../../assets/userbaner/roxo.jpg'; // Padrão inicial

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentStudent().subscribe({
      next: (usuario) => {
        if (!usuario) return;

        this.usuarioLogado = {
          ...usuario,
          id: usuario.id?.toString() || ''
        };

        this.userImageUrl = this.usuarioLogado.userImageUrl || 'https://via.placeholder.com/150';
        this.loadUserThemeAndBanner();
      },
      error: (err) => {
        console.error('Erro ao carregar usuário:', err);
      }
    });

    this.carregarUsuarioLocalmente(); // Se necessário complementar dados locais
  }

  private carregarUsuarioLocalmente(): void {
    const dados = localStorage.getItem('usuarioLogado');
    if (dados) {
      try {
        const parsed = JSON.parse(dados);
        this.temAcesso = parsed.temAcesso || false;
      } catch (e) {
        console.error('Erro ao carregar dados locais:', e);
      }
    }
  }

  loadUserThemeAndBanner(): void {
    const bannerColor = this.usuarioLogado?.bannerColor || 'roxo';
    this.updateBannerImage(bannerColor);
  }

  updateBannerImage(bannerColor: string): void {
    const bannerMap: { [key: string]: string } = {
      roxo: '../../assets/userbaner/roxo.jpg',
      azul: '../../assets/userbaner/azul.jpg',
      verde: '../../assets/userbaner/verde.jpg'
    };
    this.currentBannerImage = bannerMap[bannerColor] || bannerMap['roxo'];
  }
}