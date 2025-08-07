package com.plataforma.user.dtos;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RecentActivityDTO {

  
    private String description;
    private LocalDateTime timestamp;
    
}
