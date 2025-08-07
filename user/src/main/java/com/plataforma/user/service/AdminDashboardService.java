package com.plataforma.user.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate; // Adicione este import

import com.plataforma.user.dtos.DashboardDataDTO;
import com.plataforma.user.dtos.RecentActivityDTO;
import com.plataforma.user.repository.StudentRepository;

@Service
public class AdminDashboardService {

    private final StudentRepository studentRepository;
    private final RestTemplate restTemplate;
    
    private final String PAYMENT_SERVICE_URL = "http://localhost:8082/payments";
    private final String EVENT_SERVICE_URL = "http://localhost:8084/event-api";

       public AdminDashboardService(StudentRepository studentRepository, RestTemplate restTemplate) {
        this.studentRepository = studentRepository;
        this.restTemplate = restTemplate;
    }
     public DashboardDataDTO getDashboardData() {
        // Usuários Totais
        long totalUsers = studentRepository.count();

        // Novos Usuários (último mês)
        LocalDateTime oneMonthAgo = LocalDateTime.now().minusMonths(1);
        long newUsers = studentRepository.countByCreatedAtAfter(oneMonthAgo);

        // Receita Mensal (via RestTemplate para a API de pagamentos)
        Double monthlyRevenue = restTemplate.getForObject(PAYMENT_SERVICE_URL + "/monthly-revenue", Double.class);

        // CORREÇÃO: Obtenha a atividade recente via RestTemplate para a API de eventos
        List<RecentActivityDTO> recentActivities = getRecentActivities();

        return new DashboardDataDTO(totalUsers, newUsers, monthlyRevenue, recentActivities);
    }
    
    private List<RecentActivityDTO> getRecentActivities() {
        // CORREÇÃO: Chame a API de eventos para obter as atividades recentes
        return restTemplate.getForObject(EVENT_SERVICE_URL + "/recent", List.class);
    }
}