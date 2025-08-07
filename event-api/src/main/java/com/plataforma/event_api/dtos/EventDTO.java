package com.plataforma.event_api.dtos;


import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@NoArgsConstructor 
@AllArgsConstructor
public class EventDTO {
    private String description;
    private LocalDateTime timestamp;
}