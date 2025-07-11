import { CommonModule } from "@angular/common";
import { Component, ElementRef, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";

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
  sidebarAberta: boolean = false; // 👈 adiciona essa linha

  constructor(private router: Router, private eRef: ElementRef) {}

ngOnInit(): void {
  const usuario = localStorage.getItem('usuarioLogado');
  if (usuario) {
    this.usuarioLogado = JSON.parse(usuario);
  }

  // Aplicar o tema salvo
  const temaSalvo = localStorage.getItem('modo-tema');
  if (temaSalvo === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}


  toggleMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  toggleSidebar(): void {
    this.sidebarAberta = !this.sidebarAberta;
  }

  irParaHome(): void {
    this.menuAberto = false;
    this.router.navigate(['/dashboard']);
  }

  irParaPec(): void {
    this.menuAberto = false;
    this.router.navigate(['/my-perfil']);
  }

  irParaPerfil(): void {
    this.menuAberto = false
    this.router.navigate(['/my-profile']);
  }

  irFora(): void {
    this.menuAberto = false;
    this.router.navigate(['/']);
  }

irDark(): void {
  document.documentElement.classList.add('dark'); // adiciona classe "dark" no <html>
  localStorage.setItem('modo-tema', 'dark'); // salva preferência
}

irOfcourse(): void {
  document.documentElement.classList.remove('dark');
  localStorage.setItem('modo-tema', 'light');
}


  irVideo(): void {
    this.sidebarAberta = false;
    this.router.navigate(['/dashboard']);
  }

   irComplaint(): void {
    this.sidebarAberta = false;
    this.router.navigate(['/my-perfil']);
  }


  irPayment(): void {
    this.sidebarAberta = false;
    this.router.navigate(['/my-profile']);
  }

   irDelete(): void {
    this.sidebarAberta = false;
    this.router.navigate(['/']);
  }

  logout(): void {
    localStorage.removeItem('usuarioLogado');
    this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event'])
  clickFora(event: MouseEvent) {
    if (
      this.menuAberto &&
      this.eRef?.nativeElement &&
      !this.eRef.nativeElement.contains(event.target)
    ) {
      this.menuAberto = false;
    }
  }
}
