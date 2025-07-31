package com.plataforma.user.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class StudentStatusDTO {

       @NotBlank(message = "Status não pode ser vazio")
       private String status;
    
}
