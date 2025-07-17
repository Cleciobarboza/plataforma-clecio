package com.plataforma.user.dtos;

import java.time.LocalDate;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class StudentProfileDTO {
    private String full_name;
    private LocalDate birthDate;
    private String gender;
    private String profession;
    private String education;
    private String phone;
    private String country;
    private String city;
    private String state;

    @Size(max = 500)
    private String description;

    private LocalDate startdate;
    private String status;
    private boolean completeRegistration;

}

