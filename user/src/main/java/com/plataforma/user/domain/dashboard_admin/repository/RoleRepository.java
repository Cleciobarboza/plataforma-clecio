package com.plataforma.user.domain.dashboard_admin.repository;


import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.plataforma.user.domain.dashboard_admin.model.RoleModel;

public interface RoleRepository extends JpaRepository<RoleModel, UUID> {
    Optional<RoleModel> findByName(String name);
}

