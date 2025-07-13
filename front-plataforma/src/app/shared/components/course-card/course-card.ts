import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-card.html',
  styleUrls: ['./course-card.css'] // Corrigido aqui
})
export class CourseCard {
  @Input() title: string = '';
  @Input() image: string = '';
  @Input() isUnlocked: boolean = false;

  constructor(private router: Router) {}

  acessarCurso(): void {
    if (this.isUnlocked) {
      this.router.navigate(['/dashboard-course']);
    } else {
      alert('Este curso está bloqueado. Faça a assinatura para liberar o acesso.');
    }
  }
}
