package com.plataforma.user.domain.dashboard_admin.service;

import java.util.stream.Stream;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.plataforma.user.domain.dashboard_admin.model.RoleModel;
import com.plataforma.user.domain.dashboard_admin.repository.RoleRepository;

import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
@Slf4j
public class RoleInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;

    @Override
    @Transactional
    public void run(String... args) {
        // Lista de roles que devem existir no sistema
        Stream.of("ROLE_USER", "ROLE_ADMIN", "ROLE_STUDENT").forEach(roleName -> {
            if (roleRepository.findByName(roleName).isEmpty()) {
                roleRepository.save(RoleModel.builder().name(roleName).build());
                log.info("✅ Role '{}' criada com sucesso.", roleName);
            }
        });
    }
}
