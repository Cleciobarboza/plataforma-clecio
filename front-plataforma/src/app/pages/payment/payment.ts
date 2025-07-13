// src/app/pages/payment/payment.ts

import { Component, OnInit } from '@angular/core'; // Importe OnInit
import { DashboardHeader } from '../../shared/components/dashboard-header/dashboard-header';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/components/footer/footer';
import { PageNaoImplementada } from '../../shared/components/page-nao-implementada/page-nao-implementada';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Importe FormBuilder, ReactiveFormsModule, Validators

@Component({
  selector: 'app-payment',
  standalone: true, // Adicione standalone: true se este for um componente standalone
  imports: [
    CommonModule,
    DashboardHeader,
    FooterComponent,
    PageNaoImplementada,
    ReactiveFormsModule // Adicione ReactiveFormsModule aqui
  ],
  templateUrl: './payment.html',
  styleUrl: './payment.css'
})
export class Payment implements OnInit { // Implemente OnInit
  usuario: any; // Para armazenar o objeto usuarioLogado
  form!: FormGroup; // Para o formulário reativo

  constructor(private fb: FormBuilder) { } // Injete FormBuilder

  ngOnInit(): void {
    // 1. Carregar os dados do usuário logado do localStorage
    const dadosUsuarioLogado = localStorage.getItem('usuarioLogado');
    this.usuario = dadosUsuarioLogado ? JSON.parse(dadosUsuarioLogado) : {};

    // 2. Inicializar o formulário com o campo 'status'
    // O valor inicial será o status que já existe no usuarioLogado, se houver
    this.form = this.fb.group({
      status: [this.usuario.status || '', Validators.required] // Adiciona Validators.required
    });
  }

  salvarStatus(): void {
    if (this.form.invalid) {
      alert('Por favor, selecione um status válido.');
      this.form.markAllAsTouched(); // Marca todos os campos como tocados para exibir erros
      return;
    }

    const novoStatus = this.form.value.status;

    // Garante que usuario está inicializado para não apagar outros dados
    // Isso é importante para que os dados do my-profile sejam mantidos
    // Se 'usuarioLogado' não existia ou estava vazio, criamos um objeto aqui
    if (!this.usuario) {
      this.usuario = {};
    }

    // 3. Adicionar ou atualizar APENAS o campo 'status'
    this.usuario.status = novoStatus;

    // 4. Salvar o objeto 'usuarioLogado' completo (com todos os dados) de volta no localStorage
    localStorage.setItem('usuarioLogado', JSON.stringify(this.usuario));

    alert(`✅ Status da assinatura atualizado para "${novoStatus}" com sucesso!`);
  }

  // Remova a função 'salvarStatus' antiga (que foi colada do my-profile.ts)
  // Pois ela continha lógica de atualização de outros campos que não são relevantes aqui.
  // A função acima 'salvarStatus()' é a versão corrigida para esta página.
}