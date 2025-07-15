// src/app/pages/profile-certification/profile-certification.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer';
import { DashboardHeader } from '../../shared/components/dashboard-header/dashboard-header';
import { Temas } from '../../shared/components/temas/temas';

@Component({
  selector: 'app-profile-certification',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent,DashboardHeader,Temas], 
  templateUrl: './profile-certification.html',
  styleUrls: ['./profile-certification.css']
})
export class ProfileCertification implements OnInit {
  usuario: any;
  userImageUrl: string | null = null;
  currentTheme: string = 'roxo'; // Variável para controlar o tema ativo no componente de temas
  currentBannerImage: string = '../../assets/userbaner/roxo.jpg'; // Variável para a imagem do banner

  constructor() { }

  ngOnInit(): void {
    this.carregarDadosUsuario();
    this.loadUserTheme(); // Carrega o tema do usuário ao iniciar
  }

  carregarDadosUsuario(): void {
    const dados = localStorage.getItem('usuarioLogado');
    if (dados) {
      try {
        this.usuario = JSON.parse(dados);
        this.userImageUrl = this.usuario.userImageUrl || 'https://via.placeholder.com/150';
      } catch (e) {
        console.error('Erro ao fazer parse dos dados do usuário no localStorage:', e);
        this.usuario = {};
      }
    } else {
      this.usuario = {};
      console.warn('Nenhum dado de usuário encontrado no localStorage.');
    }
  }

  loadUserTheme(): void {
    // Carrega o tema salvo no localStorage do usuário
    const savedTheme = localStorage.getItem('userTheme');
    if (savedTheme) {
      this.currentTheme = savedTheme;
      this.updateBannerImage(savedTheme);
      // Aqui você poderia chamar um serviço de tema global para aplicar estilos se tiver um
    } else {
      // Define um tema padrão se não houver nenhum salvo
      this.currentTheme = 'roxo';
      this.updateBannerImage('roxo');
    }
  }

  onThemeSelected(selectedTheme: string): void {
    this.currentTheme = selectedTheme; // Atualiza o tema ativo
    localStorage.setItem('userTheme', selectedTheme); // Salva a escolha do usuário
    this.updateBannerImage(selectedTheme); // Atualiza a imagem do banner
    // Você também pode chamar um serviço de tema global aqui, se quiser mudar cores de texto, fundos, etc.
    alert(`Tema "${selectedTheme}" selecionado!`);
  }

  updateBannerImage(theme: string): void {
    switch (theme) {
      case 'roxo':
        this.currentBannerImage = '../../assets/userbaner/roxo.jpg';
        break;
      case 'azul':
        this.currentBannerImage = '../../assets/userbaner/azul.jpg';
        break;
      case 'rosa':
        this.currentBannerImage = '../../assets/userbaner/rosa.jpg';
        break;
      case 'vermelho':
        this.currentBannerImage = '../../assets/userbaner/vermelho.jpg';
        break;
      default:
        this.currentBannerImage = '../../assets/userbaner/roxo.jpg'; // Fallback
    }
  }
}