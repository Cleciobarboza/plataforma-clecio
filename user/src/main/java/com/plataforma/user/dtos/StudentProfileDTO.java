package com.plataforma.user.dtos;

import java.time.LocalDate;

import jakarta.validation.constraints.Size;

public record StudentProfileDTO(
    String full_name,
    LocalDate birthDate,
    String gender,
    String profession,
    String education,
    String phone,
    String country,
    String city,
    String state,
    @Size(max = 500, message = "Description cannot exceed 500 characters")
    String description,
    LocalDate startdate,//implementar data e inicio da conta
    String status,
    boolean completeRegistration
) {

    public String user_name() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'user_name'");
    }

    public String email() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'email'");
    }

    public String password() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'password'");
    }}
