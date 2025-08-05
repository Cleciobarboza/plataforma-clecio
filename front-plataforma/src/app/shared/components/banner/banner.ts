import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true, // Componente standalone
  imports: [CommonModule],
  templateUrl: './banner.html',
  styleUrl: './banner.css'
})
export class Banner implements OnInit{

  @Input() activeBanner: string = 'roxo'; // Tema inicial, padrão é roxo
  @Output() bannerSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    // Pode inicializar algo aqui se necessário
  }

  selectBanner(banner: string): void {
    this.activeBanner = banner; // Atualiza o tema ativo internamente para o CSS
    this.bannerSelected.emit(banner); // Emite o tema selecionado para o componente pai
  }
}


