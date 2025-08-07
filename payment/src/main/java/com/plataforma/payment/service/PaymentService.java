package com.plataforma.payment.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.plataforma.payment.dtos.PaymentRequestDTO;
import com.plataforma.payment.repository.PaymentRepository;

@Service
public class PaymentService {
     private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public Double calculateMonthlyRevenue() {
        LocalDateTime oneMonthAgo = LocalDateTime.now().minusMonths(1);
        return paymentRepository.getMonthlyRevenue(oneMonthAgo);
    }
      public void processPayment(PaymentRequestDTO request) {
        // 1. Validar os dados de pagamento (valor, método, etc.)

        // 2. Processar a transação financeira
        // Ex: Chamar um gateway de pagamento (Stripe, PagSeguro, etc.)

        // 3. Notificar o serviço de 'user' sobre a confirmação do pagamento
        // Aqui você faria uma chamada HTTP para a API do microsserviço de user
        // para atualizar o status do aluno de 'pendente' para 'ativo'.
        
        // Exemplo simplificado:
        System.out.println("Pagamento recebido para o aluno: " + request.getStudentId());
        System.out.println("Valor: " + request.getAmount());
        System.out.println("Método: " + request.getPaymentMethod());

        // AQUI VOCÊ ADICIONARIA A LÓGICA PARA CHAMAR O SERVIÇO DE USER
        // Exemplo: restTemplate.put("http://user-service/users/" + request.getStudentId() + "/status", "ativo");
    }

    // ... (outros métodos, como calculateMonthlyRevenue)
}
    

