// src/app/pages/dashboard-course/dashboard-course.ts (ou o nome do seu arquivo TS)
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // Import DatePipe
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // Import DomSanitizer and SafeResourceUrl
import { FooterComponent } from '../../shared/components/footer/footer'; // Certifique-se que o path está correto


@Component({
  selector: 'app-dashboard-course',
  standalone: true,
  imports: [CommonModule, DatePipe, FooterComponent], 
  templateUrl: './dashboard-course.html',
  styleUrls: ['./dashboard-course.css']
})
export class DashboardCourse implements OnInit {
  tible: string = 'Carregando Curso...'; // Título do curso (corrigido de 'tible' para 'title' se for erro de digitação)
  todayDate: Date = new Date();
  videoList: { name: string; embed: string; }[] = [];
  usuario: any;
  currentBannerImage: string = '../../assets/userbaner/roxo.jpg'; // Valor padrão


  // Dados de exemplo para seus cursos e vídeos (em um app real, isso viria de um serviço/API)
  private allCoursesData = [
    {
      id: 'id-do-curso-125', // Introdução
      title: 'Introdução ao Desenvolvimento',
      videos: [
        { name: 'Bem-vindo ao Curso', embed: '<iframe width="560" height="315" src="https://www.youtube.com/watch?v=UVP-HZECmo0" frameborder="0" allowfullscreen></iframe>' },
        { name: 'Primeiros Passos', embed: 'https://www.youtube.com/embed/VIDEO_ID_INTRO_2' }
      ]
    },
    {
      id: 'id-do-curso-123', // Framework Angular
      title: 'Dominando Angular: Do Básico ao Avançado',
      videos: [
        { name: 'O que é Angular?', embed: 'https://www.youtube.com/embed/VIDEO_ID_ANGULAR_1' },
        { name: 'Componentes e Módulos', embed: 'https://www.youtube.com/embed/VIDEO_ID_ANGULAR_2' },
        { name: 'Serviços e Injeção de Dependência', embed: 'https://www.youtube.com/embed/VIDEO_ID_ANGULAR_3' }
      ]
    },
    {
      id: 'id-do-curso-124', // Java Spring Boot
      title: 'Desenvolvimento Backend com Spring Boot',
      videos: [
        { name: 'Introdução ao Spring Boot', embed: 'https://www.youtube.com/embed/VIDEO_ID_SPRING_1' },
        { name: 'REST APIs com Spring', embed: 'https://www.youtube.com/embed/VIDEO_ID_SPRING_2' },
        { name: 'Persistência de Dados (JPA/Hibernate)', embed: 'https://www.youtube.com/embed/VIDEO_ID_SPRING_3' }
      ]
    },
    {
      id: 'id-do-curso-126', // Novo Card (Substitua por um nome real)
      title: 'Novo Curso Incrível',
      videos: [
        { name: 'Primeira Aula do Novo Curso', embed: 'https://www.youtube.com/embed/VIDEO_ID_NOVO_1' },
        { name: 'Segunda Aula do Novo Curso', embed: 'https://www.youtube.com/embed/VIDEO_ID_NOVO_2' }
      ]
    },
    // Adicione mais cursos aqui conforme seus courseId's definidos
  ];

  constructor(
    private route: ActivatedRoute, // Injeta ActivatedRoute
    private sanitizer: DomSanitizer // Injeta DomSanitizer
  ) { }

ngOnInit(): void {
  // Subscreve para alterações nos parâmetros da rota
  this.route.paramMap.subscribe(params => {
    const courseId = params.get('courseId'); 
    console.log('Course ID recebido:', courseId); // <--test
        this.loadUserThemeAndBanner();
    if (courseId) {
      this.loadCourseContent(courseId);
    } else {
      console.warn('ID do curso não fornecido na rota.');
      this.tible = 'Curso não encontrado';
      this.videoList = [];
    }
  });
}


  private loadCourseContent(courseId: string): void {
    const foundCourse = this.allCoursesData.find(course => course.id === courseId);

    if (foundCourse) {
      this.tible = foundCourse.title;
      this.videoList = foundCourse.videos;
    } else {
      this.tible = 'Curso não encontrado';
      this.videoList = [];
      console.error(`Curso com ID '${courseId}' não encontrado.`);
    }
  }

  getEmbedUrl(url: string): SafeResourceUrl {
    // Sanitiza a URL para ser usada no iframe
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
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