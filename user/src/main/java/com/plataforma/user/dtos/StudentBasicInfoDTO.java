package com.plataforma.user.dtos;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StudentBasicInfoDTO {
    private String userName;
    private LocalDate startDate;
}