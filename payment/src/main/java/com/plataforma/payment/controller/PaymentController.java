package com.plataforma.payment.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping; // Importe o PostMapping
import org.springframework.web.bind.annotation.RequestBody; // Importe o RequestBody
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.plataforma.payment.dtos.PaymentRequestDTO;
import com.plataforma.payment.dtos.PaymentSuccessResponse;
import com.plataforma.payment.service.PaymentService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/payments")
@Tag(name = "Payments", description = "Endpoints para gerenciamento de pagamentos e dados financeiros")
public class PaymentController {
    
    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @Operation(
        summary = "Obtém a receita mensal total",
        description = "Calcula e retorna a receita total gerada no último mês.",
        responses = {
            @ApiResponse(
                responseCode = "200", 
                description = "Receita mensal calculada com sucesso.",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = Double.class))
            ),
            @ApiResponse(
                responseCode = "500", 
                description = "Erro interno no servidor."
            )
        }
    )
    @GetMapping("/monthly-revenue")
    public ResponseEntity<Double> getMonthlyRevenue() {
        Double monthlyRevenue = paymentService.calculateMonthlyRevenue();
        return ResponseEntity.ok(monthlyRevenue);
    }
    
    // --- NOVO ENDPOINT PARA PROCESSAR PAGAMENTOS ---
    @Operation(
        summary = "Processa uma nova assinatura",
        description = "Recebe os dados de pagamento do frontend, processa a transação e notifica o serviço de usuário.",
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "Pagamento processado com sucesso.",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = PaymentSuccessResponse.class))
            ),
            @ApiResponse(
                responseCode = "400",
                description = "Requisição inválida."
            ),
            @ApiResponse(
                responseCode = "500",
                description = "Erro ao processar o pagamento."
            )
        }
    )
    @PostMapping("/process")
    public ResponseEntity<PaymentSuccessResponse> processPayment(@RequestBody PaymentRequestDTO request) {
        paymentService.processPayment(request);
        return ResponseEntity.ok(new PaymentSuccessResponse("Pagamento efetuado com sucesso!"));
    }
}