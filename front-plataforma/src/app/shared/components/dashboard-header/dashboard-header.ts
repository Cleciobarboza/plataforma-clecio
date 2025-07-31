import { CommonModule } from "@angular/common";
import { Component, ElementRef, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../core/services/auth-service/auth-service";
import { StudentBasicInfoDTO } from "../../../api/generated/model/studentBasicInfoDTO";
import { UsuarioLogadoDTO } from "../../models/usuario-logado.dto";



@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-header.html',
  styleUrls: ['./dashboard-header.css']
})
export class DashboardHeader implements OnInit {
  usuarioLogado : UsuarioLogadoDTO | null = null;
  menuAberto: boolean = false;
  sidebarAberta: boolean = false;
  userImageUrl: string | null = null;

  constructor(
    private router: Router,
    private eRef: ElementRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentStudent().subscribe({
      next: (res) => {
       this.usuarioLogado = res; 
       this.userImageUrl = res?.userImageUrl || 'https://via.placeholder.com/150';
       this.aplicarTema((res?.userTheme as 'light' | 'dark' | null) ?? null); // <-- ajuste aqui
    },
      error: (err) => {
        console.error('Erro ao carregar dados do usuário:', err);
        // Redirecionar para login ou página de erro, se necessário
      }
    });
  }

  aplicarTema(tema: 'light' | 'dark' | null): void {
    if (tema === 'dark') {
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
    this.menuAberto = false;
    this.router.navigate(['/my-profile']);
  }

  irParaMyregistration(): void {
    this.menuAberto = false;
    this.router.navigate(['/my-registration']);
  }

  irFora(): void {
    this.menuAberto = false;
    this.router.navigate(['/']);
  }

  irDark(): void {
    document.documentElement.classList.add('dark');
    // Preferência deve ser atualizada via backend se necessário
  }

  irOfcourse(): void {
    document.documentElement.classList.remove('dark');
    // Preferência deve ser atualizada via backend se necessário
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
    if (!confirmar) return;

    const usuario = this.authService.currentUser.value;

    if (!usuario || !usuario.id) {
      alert('Usuário não encontrado.');
      return;
    }

    // Encapsule a exclusão no AuthService!
    this.authService.deleteAccount(usuario.id).subscribe({
      next: () => {
        this.authService.logout();
        alert('Sua conta foi excluída com sucesso.');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Erro ao deletar conta:', err);
        alert('Erro ao excluir conta. Tente novamente.');
      }
    });
  }

  logout(): void {
    this.authService.logout();
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