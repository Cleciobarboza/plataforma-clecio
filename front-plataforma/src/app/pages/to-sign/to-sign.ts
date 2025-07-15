import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer/footer';
import { HeaderToSign } from '../../shared/components/header-to-sign/header-to-sign';



@Component({
  selector: 'app-to-sign',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderToSign],
  templateUrl: './to-sign.html',
  styleUrls: ['./to-sign.css'] // <- aqui corrigido
})
export class ToSign {}

