package com.plataforma.user.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "TB_student")
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student implements Serializable{
  private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id_user", nullable = false, updatable = false)
    @Builder.Default
    private UUID id_user = UUID.randomUUID();


    @Column(name = "user_name", nullable = false)
    private String user_name;

   
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @JsonIgnore
    @Column(name = "password", nullable = false)
    private String password;

    // Supplementary data
    @Column(name = "full_name")
    private String full_name;

    @Column(name = "gender")
    private String gender;

    @Column(name = "birth_date")
    private LocalDate birthDate;


    @Column(name = "phone")
    private String phone;

    @Column(name = "country")
    private String country;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "profession")
    private String profession;

    @Column(name = "education")  
    private String education;

    @Column(name ="startdate")
    private LocalDate startdate;

    @Column(name = "status")
    private String status;
    
    @Column(name = "description", length = 500)
    private String description;




    private boolean completeRegistration = false;
}
