package com.plataforma.user.config.jwt;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired; // Pode ser substituído por lombok.RequiredArgsConstructor
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.plataforma.user.service.JwtTokenService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
// import lombok.RequiredArgsConstructor; // Adicione se preferir injeção via construtor

@Component
// @RequiredArgsConstructor // Use esta anotação se quiser injeção por construtor e remover @Autowired
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    // Se usar @RequiredArgsConstructor, mude para 'private final'
    @Autowired
    private JwtTokenService jwtTokenService;

    // Se usar @RequiredArgsConstructor, mude para 'private final'
    @Autowired
    private UserDetailsService userDetailsService; // Deve ser seu StudentDetailsService

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        // Se não houver cabeçalho de autorização ou não começar com "Bearer ",
        // apenas passe a requisição adiante na cadeia de filtros.
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Extrai o token JWT (removendo "Bearer ")
        String token = authHeader.substring(7);

        // Valida o token e obtém o username (subject)
        String username = jwtTokenService.validateToken(token);

        // Se o token é válido E o usuário ainda não está autenticado no contexto de segurança
        if (username != null && !username.isEmpty() && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Carrega os detalhes do usuário usando o UserDetailsService (seu StudentDetailsService)
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            // Verifica se o usuário carregado é válido e as credenciais não estão expiradas/bloqueadas (opcional, já coberto por UserDetails)
            if (userDetails.isEnabled() && userDetails.isAccountNonExpired() && userDetails.isAccountNonLocked() && userDetails.isCredentialsNonExpired()) {
                 // Cria um objeto de autenticação para o Spring Security
                var authentication = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());

                // Adiciona detalhes da requisição ao objeto de autenticação (endereço IP, sessão ID, etc.)
                authentication.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request));

                // Define o objeto de autenticação no SecurityContextHolder, autenticando o usuário para esta requisição
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        // Continua a cadeia de filtros
        filterChain.doFilter(request, response);
    }
}