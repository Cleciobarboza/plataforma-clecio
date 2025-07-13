import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer/footer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseCard } from '../../shared/components/course-card/course-card';




@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCard, FooterComponent], 
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

   temAcesso: boolean = false; // ✅ Definir a variável usada no ngModel

  usuario: any;

  ngOnInit(): void {
    const dados = localStorage.getItem('usuarioLogado');
    this.usuario = dados ? JSON.parse(dados) : null;
  }
}



