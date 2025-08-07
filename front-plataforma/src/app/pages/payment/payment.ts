import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DashboardHeader } from '../../shared/components/dashboard-header/dashboard-header';
import { FooterComponent } from '../../shared/components/footer/footer';
import { StudentModel } from '../../api/generated/model/studentModel';
// Corrigido: o caminho de importação e os tipos corretos
import { PaymentRequestDTO, PaymentSuccessResponse } from '../../api/generated/payment/modelp';
import { OpenAPIDefinitionService } from '../../api/generated/payment/payment-api'; 
import { AuthService } from '../../core/services/auth-service/auth-service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    DashboardHeader,
    FooterComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './payment.html',
  styleUrls: ['./payment.css'],
})
export class Payment implements OnInit {
  paymentForm!: FormGroup;
  usuarioLogado!: StudentModel;

  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private apiService: OpenAPIDefinitionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // ... (restante do código ngOnInit)
  }

  onSubmitPayment(): void {
    if (this.paymentForm.invalid || this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const paymentData: PaymentRequestDTO = {
      studentId: this.usuarioLogado.id,
      amount: this.paymentForm.get('paymentOption')?.value === 'cash' ? 2250 : 3000,
      paymentMethod: this.paymentForm.get('paymentOption')?.value,
      description: 'Annual Subscription'
    };

    // Corrigido: 't' para 'next' e o tipo da resposta
    this.apiService.processPayment(paymentData).subscribe({
      next: (response: PaymentSuccessResponse) => {
        console.log('✅ Pagamento processado com sucesso!', response);
        alert('✅ Sua assinatura agora está ativa!');
        this.authService.refreshStudentStatus('ativo');
        this.router.navigate(['/dashboard']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('❌ Erro ao processar o pagamento:', error);
        this.errorMessage = 'Ocorreu um erro ao processar seu pagamento. Tente novamente.';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}