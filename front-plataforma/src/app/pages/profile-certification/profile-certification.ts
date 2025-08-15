import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer';
import { DashboardHeader } from '../../shared/components/dashboard-header/dashboard-header';
import { UsuarioLogadoDTO } from '../../shared/models/usuario-logado.dto';
import { StudentProfileDTO, StudentPreferenceUpdateDTO } from '../../api/generated/model';
import { AuthService } from '../../core/services/auth-service/auth-service'; // ajuste o caminho conforme seu projeto

@Component({
  selector: 'app-profile-certification',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, DashboardHeader], 
  templateUrl: './profile-certification.html',
  styleUrls: ['./profile-certification.css']
})
export class ProfileCertification implements OnInit {
  usuarioLogado: UsuarioLogadoDTO | null = null;
  usuario: UsuarioLogadoDTO | null = null; 
  userImageUrl: string | null = null;
  currentBanner: string = 'roxo';
  currentBannerImage: string = '../../assets/userbaner/roxo.jpg';
  menuAberto: boolean = false;

  private authService = inject(AuthService);

  constructor() {}

  ngOnInit(): void {
  this.authService.getCurrentStudent().subscribe({
    next: (usuario) => {
      if (!usuario) return;

      this.usuarioLogado = {
        ...usuario,
        id: usuario.id?.toString() || ''
      };

      this.userImageUrl = usuario.userImageUrl || 'https://via.placeholder.com/150';
      this.currentBanner = usuario.userTheme || 'roxo';
      this.updateBannerImage(this.currentBanner);
    },
    error: (err) => {
      console.error('Erro ao carregar usuário:', err);
    }
  });
}


carregarDadosUsuario(): void {
  this.authService.getCurrentStudent().subscribe({
    next: (usuario) => {
      if (!usuario) return;

      this.usuarioLogado = {
        ...usuario,
        id: usuario.id?.toString() || ''
      };

      this.userImageUrl = usuario.userImageUrl || 'https://via.placeholder.com/150';
      this.currentBanner = usuario.userTheme || 'roxo';
      this.updateBannerImage(this.currentBanner);
    },
    error: (err) => {
      console.error('Erro ao carregar usuário:', err);
    }
  });
}


  loadUserBanner(): void {
    const savedBanner = this.usuarioLogado?.userTheme;
    this.currentBanner = savedBanner || 'roxo';
    this.updateBannerImage(this.currentBanner);
  }

  selecionarBanner(banner: string): void {
    this.menuAberto = false;
    this.currentBanner = banner;
    this.updateBannerImage(banner);
    this.atualizarPreferenciaBanner(banner);
  }

  updateBannerImage(banner: string): void {
    const bannerMap: { [key: string]: string } = {
      roxo: '../../assets/userbaner/roxo.jpg',
      azul: '../../assets/userbaner/azul.jpg',
      rosa: '../../assets/userbaner/rosa.jpg',
      vermelho: '../../assets/userbaner/vermelho.jpg'
    };
    this.currentBannerImage = bannerMap[banner] || bannerMap['roxo'];
  }

  atualizarPreferenciaBanner(bannerColor: string): void {
    if (!this.usuarioLogado) return;

    const preferencia: StudentPreferenceUpdateDTO = {
      bannerColor: bannerColor
    };

    this.authService.updateStudentPreferences(preferencia).subscribe({
      next: () => {
        console.log('Tema atualizado com sucesso no backend');
      },
      error: (err) => {
        console.error('Erro ao atualizar tema:', err);
      }
    });
  }
}