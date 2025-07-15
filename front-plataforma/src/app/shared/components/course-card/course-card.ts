// src/app/shared/components/course-card/course-card.ts

import { Component, Input, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common'; // Import isPlatformBrowser
import { Router } from '@angular/router'; // Only Router is needed for navigation

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-card.html',
  styleUrls: ['./course-card.css']
})
export class CourseCard implements OnInit {
  @Input() title: string = '';
  @Input() image: string = '';
  @Input() courseId: string = ''; // This Input property receives the course ID from the parent

  usuarioStatus: string | null = null; // To store the user's subscription status

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // Needed for localStorage check
  ) { }

  ngOnInit(): void {
    // Logic to get the user's status from localStorage
    if (isPlatformBrowser(this.platformId)) { // Check if running in a browser
      const dadosUsuario = localStorage.getItem('usuarioLogado');
      if (dadosUsuario) {
        try {
          const usuario = JSON.parse(dadosUsuario);
          this.usuarioStatus = usuario.status;
        } catch (e) {
          console.error('Erro ao fazer parse do usuarioLogado no localStorage:', e);
          this.usuarioStatus = null;
        }
      } else {
        this.usuarioStatus = null; // No user logged in or no data
      }
    } else {
      // For server-side rendering, assume inactive or handle as needed
      this.usuarioStatus = 'inativo';
    }
  }

  // Getter to determine if the course is accessible based on user status
  get isAccessible(): boolean {
    return this.usuarioStatus === 'ativo';
  }

 acessarCurso(): void {
  if (this.isAccessible) {
    console.log('Navegando para curso com ID:', this.courseId);
    this.router.navigate(['/dashboard-course', this.courseId]);
  } else {
    alert('🔒 Você precisa ter uma assinatura ativa para acessar este curso.');
  }
  // Antes de redirecionar
localStorage.setItem('ultimoCursoAssistido', JSON.stringify({
  title: this.title,
  image: this.image,
  courseId: this.courseId
}));

}

}