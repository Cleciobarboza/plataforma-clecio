package com.plataforma.user.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager; // Importe AuthenticationManager
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration; // Importe AuthenticationConfiguration
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity; // Importe
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer; // Importe
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter; // Importe

import com.plataforma.user.config.jwt.JwtAuthenticationFilter;

import lombok.RequiredArgsConstructor; // Importe Lombok

@Configuration
@EnableWebSecurity // Adicione esta anotação
@RequiredArgsConstructor // Adicione esta anotação se usar Lombok para injeção via construtor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 2. Desabilite CSRF usando a sintaxe mais recente
            .csrf(AbstractHttpConfigurer::disable)
            // 3. Configure a política de gerenciamento de sessão como STATELESS para JWT
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            // 4. Defina as regras de autorização para as requisições HTTP
            .authorizeHttpRequests(auth -> auth
                // Permite requisições POST para /auth/login e /auth/register
                .requestMatchers(HttpMethod.POST, "/api/auth/login", "/api/auth/register").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/auth/me").authenticated()
                .requestMatchers("/dashboard_admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
          
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
            

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

   
}