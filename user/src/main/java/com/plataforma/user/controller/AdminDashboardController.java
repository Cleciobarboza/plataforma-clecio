package com.plataforma.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.plataforma.user.dtos.DashboardDataDTO;
import com.plataforma.user.service.AdminDashboardService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/dashboard_admin")
@Tag(name = "Admin Dashboard", description = "Endpoints para o painel de controle do administrador")
@PreAuthorize("hasRole('ADMIN')")
public class AdminDashboardController {

    private final AdminDashboardService adminDashboardService;

    public AdminDashboardController(AdminDashboardService adminDashboardService) {
        this.adminDashboardService = adminDashboardService;
    }

    @Operation(
        summary = "Obtém dados para o painel do administrador",
        description = "Retorna dados agregados como total de usuários, novos usuários, receita mensal e atividade recente.",
        responses = {
            @ApiResponse(
                responseCode = "200", 
                description = "Dados do painel recuperados com sucesso",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = DashboardDataDTO.class))
            ),
            @ApiResponse(
                responseCode = "401", 
                description = "Não autorizado (token ausente ou inválido)"
            ),
            @ApiResponse(
                responseCode = "403", 
                description = "Proibido (usuário não possui a role 'ADMIN')"
            ),
            @ApiResponse(
                responseCode = "500", 
                description = "Erro interno do servidor"
            )
        }
    )
    @GetMapping
    public ResponseEntity<DashboardDataDTO> getDashboardData() {
        DashboardDataDTO data = adminDashboardService.getDashboardData();
        return ResponseEntity.ok(data);
    }
}