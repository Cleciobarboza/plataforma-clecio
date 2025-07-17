package com.plataforma.user.domain.dashboard_admin.model;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "TB_roles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoleModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(unique = true, nullable = false)
    private String name; // Ex: ROLE_ADMIN, ROLE_USER

    @Column(length = 100)
    private String description;

    // Hierarquia: por exemplo, ROLE_TEACHER herda permissões de ROLE_USER
    @ManyToOne
    @JoinColumn(name = "parent_role_id") // Melhor nome
    private RoleModel parentRole;
}