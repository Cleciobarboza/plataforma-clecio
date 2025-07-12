import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-page-nao-implementada',
  imports: [CommonModule],
  standalone: true,
  styleUrls: ['./page-nao-implementada.css'],
  template: `
    <div class="flex items-center justify-center min-h-[70vh] bg-white">
      <div class="max-w-md w-full text-center p-6 border-2 border-purple-600 rounded-xl shadow-md">
        <h1 class="text-2xl font-bold text-red-600 mb-4">🚧 Página não implementada!</h1>
        <p class="text-gray-600 text-base">
          Estamos trabalhando para disponibilizar esse conteúdo em breve.
        </p>
      </div>
    </div>
  `
})
export class PageNaoImplementada {}