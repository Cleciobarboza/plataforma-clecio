import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PageNaoImplementada } from '../../shared/components/page-nao-implementada/page-nao-implementada';
import { FooterComponent } from '../../shared/components/footer/footer';
import { HeaderComponent } from '../../shared/components/header/header';

@Component({
  selector: 'app-to-sign',
  standalone: true,
  imports: [CommonModule, HeaderComponent, PageNaoImplementada, FooterComponent],
  templateUrl: './to-sign.html',
  styleUrls: ['./to-sign.css'] // <- aqui corrigido
})
export class ToSign {}

