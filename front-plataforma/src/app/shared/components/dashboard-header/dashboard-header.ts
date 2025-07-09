import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-header.html',
  styleUrls: ['./dashboard-header.css']
})
export class DashboardHeader implements OnInit {
  usuarioLogado: any;
  menuAberto: boolean = false;

  constructor(private router: Router, private eRef: ElementRef) {}

  irParaPerfil(): void {
   this.menuAberto = false; // fecha o menu
   this.router.navigate(['/my-profile']);
  }


  ngOnInit(): void {
    const usuario = localStorage.getItem('usuarioLogado');
    if (usuario) {
      this.usuarioLogado = JSON.parse(usuario);
    }
  }

  logout(): void {
    localStorage.removeItem('usuarioLogado');
    this.router.navigate(['/login']);
  }

  toggleMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  // 👇 Agora está dentro da classe, com '$event' correto e sem erro
  @HostListener('document:click', ['$event'])
  clickFora(event: MouseEvent) {
    // Verificação extra para garantir segurança no TS
    if (
      this.menuAberto &&
      this.eRef?.nativeElement &&
      !this.eRef.nativeElement.contains(event.target)
    ) {
      this.menuAberto = false;
    }
  }
}


