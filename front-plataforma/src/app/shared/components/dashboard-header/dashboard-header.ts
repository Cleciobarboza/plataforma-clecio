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
  sidebarAberta: boolean = false; 
   userImageUrl: string | null = null;

  constructor(private router: Router, private eRef: ElementRef) {}

ngOnInit(): void {
  const usuario = localStorage.getItem('usuarioLogado');
  if (usuario) {
    this.usuarioLogado = JSON.parse(usuario);
    this.userImageUrl = this.usuarioLogado.userImageUrl || 'https://via.placeholder.com/150';
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
    this.router.navigate(['/profile-certification']);
  }

  irParaPerfil(): void {
    this.menuAberto = false
    this.router.navigate(['/my-profile']);
  }

  irParaMyregistration(): void {
    this.menuAberto = false
    this.router.navigate(['/my-registration']);
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
    this.router.navigate(['/course-and-videos']);
  }

   irComplaint(): void {
    this.sidebarAberta = false;
    this.router.navigate(['/complaint']);
  }


  irPayment(): void {
    this.sidebarAberta = false;
    this.router.navigate(['/payment']);
  }

   irDelete(): void {
  this.sidebarAberta = false;

  const confirmar = confirm("Você tem certeza que deseja excluir sua conta? Essa ação é irreversível.");

  if (confirmar) {
    // Deleta o usuário logado
    const usuarioAtual = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
    const listaUsuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    // Remove da lista
    const novaLista = listaUsuarios.filter((u: any) => u.email !== usuarioAtual.email);

    localStorage.setItem('usuarios', JSON.stringify(novaLista));
    localStorage.removeItem('usuarioLogado');

    alert('Sua conta foi excluída com sucesso.');
    this.router.navigate(['/']);
  }
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
