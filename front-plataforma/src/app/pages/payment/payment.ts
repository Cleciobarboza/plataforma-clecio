import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DashboardHeader } from '../../shared/components/dashboard-header/dashboard-header';
import { FooterComponent } from '../../shared/components/footer/footer';
import { PageNaoImplementada } from '../../shared/components/page-nao-implementada/page-nao-implementada';

import { StudentStatusDTO } from '../../api/generated/model/studentStatusDTO';
import { StudentModel } from '../../api/generated/model';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../core/services/auth-service/auth-service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    DashboardHeader,
    FooterComponent,
    PageNaoImplementada,
    ReactiveFormsModule,
  ],
  templateUrl: './payment.html',
  styleUrls: ['./payment.css'], // <-- Corrigido: styleUrl -> styleUrls
})
export class Payment implements OnInit {
  form!: FormGroup;
  usuarioLogado!: StudentModel;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentStudent().subscribe((usuario) => {
      if (!usuario || !usuario.id) {
        alert('❌ Usuário não autenticado.');
        return;
      }

      this.usuarioLogado = usuario;

      this.form = this.fb.group({
        status: [usuario.status || 'pendente', Validators.required],
      });
    });
  }

  salvarStatus(): void {
    if (this.form.invalid) {
      alert('Por favor, selecione um status válido.');
      this.form.markAllAsTouched();
      return;
    }

 const novoStatus: StudentStatusDTO = {
  status: this.form.value.status
};

this.authService.updateStatus(this.usuarioLogado.id!, novoStatus).subscribe({
  next: () => {
    alert(`✅ Status atualizado para "${novoStatus.status}" com sucesso!`);
  },
  error: (err: HttpErrorResponse) => {
    console.error('Erro ao atualizar status:', err.message);
    alert('❌ Erro ao atualizar status.');
  },
});
  }
}