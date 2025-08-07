package com.plataforma.user.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardDataDTO {

    private long totalUsers;
    private long newUsers;
    private Double monthlyRevenue;
    private List<RecentActivityDTO> recentActivities;
    
}
