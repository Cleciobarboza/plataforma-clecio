import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-last-watched-card',
  imports: [CommonModule],
  templateUrl: './last-watched-card.html',
  styleUrl: './last-watched-card.css'
})
export class LastWatchedCard implements OnInit{
  lastCourse: { title: string; image: string; courseId: string } | null = null;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const dados = localStorage.getItem('ultimoCursoAssistido');
      if (dados) {
        this.lastCourse = JSON.parse(dados);
      }
    }
  }

  continuarCurso(): void {
    if (this.lastCourse) {
      this.router.navigate(['/dashboard-course', this.lastCourse.courseId]);
    }
  }
}
