import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  usuario: any;

  ngOnInit(): void {
    const dados = localStorage.getItem('usuarioLogado');
    this.usuario = dados ? JSON.parse(dados) : null;
  }
}

