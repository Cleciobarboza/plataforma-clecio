import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer/footer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseCard } from '../../shared/components/course-card/course-card';
import { FreeCards } from "../../shared/components/free-cards/free-cards";






@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCard, FooterComponent, FreeCards], 
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

  temAcesso: boolean = false; // ✅ Definir a variável usada no ngModel
  usuario: any;
  currentBannerImage: string = '../../assets/userbaner/roxo.jpg'; // Valor padrão

  constructor() { }

  ngOnInit(): void {
    const dados = localStorage.getItem('usuarioLogado');
    this.usuario = dados ? JSON.parse(dados) : null;
    this.loadUserThemeAndBanner();
  }

  // 3. Método para carregar o tema e atualizar o banner
  loadUserThemeAndBanner(): void {
    const savedTheme = localStorage.getItem('userTheme');
    if (savedTheme) {
      this.updateBannerImage(savedTheme);
    } else {
      // Se não houver tema salvo, usa o roxo como padrão
      this.updateBannerImage('roxo');
    }
  }

  // 4. Método para atualizar a imagem do banner com base no tema
  updateBannerImage(theme: string): void {
    switch (theme) {
      case 'roxo':
        this.currentBannerImage = '../../assets/userbaner/roxo.jpg';
        break;
      case 'azul':
        this.currentBannerImage = '../../assets/userbaner/azul.jpg';
        break;
      case 'rosa': // Certifique-se de que você tem uma imagem rosa.jpg
        this.currentBannerImage = '../../assets/userbaner/rosa.jpg';
        break;
      case 'vermelho': // Certifique-se de que você tem uma imagem vermelho.jpg
        this.currentBannerImage = '../../assets/userbaner/vermelho.jpg';
        break;
      default:
        this.currentBannerImage = '../../assets/userbaner/roxo.jpg'; // Fallback
    }
  }
}









  



