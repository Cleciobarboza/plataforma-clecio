package com.plataforma.user.domain.dashboard_admin.service;



import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.plataforma.user.domain.dashboard_admin.model.RoleModel;
import com.plataforma.user.domain.dashboard_admin.repository.RoleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleModel getOrCreateUserRole() {
        Optional<RoleModel> roleOpt = roleRepository.findByName("ROLE_USER");

        if (roleOpt.isPresent()) {
            return roleOpt.get();
        }

        RoleModel roleUser = RoleModel.builder()
                .id(UUID.randomUUID())
                .name("ROLE_USER")
                .build();

        return roleRepository.save(roleUser);
    }

    public List<RoleModel> findAll() {
        return roleRepository.findAll();
    }

    public Optional<RoleModel> findByName(String name) {
        return roleRepository.findByName(name);
    }

    public RoleModel save(RoleModel role) {
        return roleRepository.save(role);
    }

    public void deleteById(UUID id) {
        roleRepository.deleteById(id);
    }
}
