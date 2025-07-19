package com.plataforma.user.security;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.POST, "/auth/login", "/auth/register").permitAll()
                .requestMatchers("/dashboard_admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            );
        return http.build();
    }
// ...existing code...

// Remova ou comente este bean:
/*
@Bean
public UserDetailsService users() {
    UserDetails admin = User.withUsername("admin")
        .password("{noop}senha")
        .roles("ADMIN")
        .build();

    UserDetails user = User.withUsername("user")
        .password("{noop}senha")
        .roles("USER")
        .build();

    return new InMemoryUserDetailsManager(admin, user);
}
*/

// ...existing code...
  

        @Bean
        public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    
    }
}