import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer';
import { HeaderComponent } from '../../shared/components/header/header';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css']
})
export class MainLayoutComponent {
  currentRoute = '';

  constructor(private router: Router) {
    // Escuta mudanças de rota para controlar visibilidade de header/footer
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  isHome(): boolean {
    return this.currentRoute === '/' || this.currentRoute === '/home';
  }

  isDashboard(): boolean {
    return this.currentRoute.includes('/dashboard');
  }
}
