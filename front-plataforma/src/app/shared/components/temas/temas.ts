// src/app/shared/components/temas/temas.ts
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule para usar ngClass, ngIf, etc.

@Component({
  selector: 'app-temas',
  standalone: true, // Componente standalone
  imports: [CommonModule], // Adicionar CommonModule aqui
  templateUrl: './temas.html',
  styleUrls: ['./temas.css'] // Note o 's' em styleUrls
})
export class Temas implements OnInit {
  @Input() activeTheme: string = 'roxo'; // Tema inicial, padrão é roxo
  @Output() themeSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    // Pode inicializar algo aqui se necessário
  }

  selectTheme(theme: string): void {
    this.activeTheme = theme; // Atualiza o tema ativo internamente para o CSS
    this.themeSelected.emit(theme); // Emite o tema selecionado para o componente pai
  }
}