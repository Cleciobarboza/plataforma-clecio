package com.plataforma.user.service;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT; 
import com.auth0.jwt.algorithms.Algorithm; 
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.plataforma.user.model.StudentModel;


@Service
public class JwtTokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    // Gerador de Token
    // O parâmetro de tipo <Algorithm> foi removido aqui
public String generateToken(StudentModel student) {
    try {
        Algorithm algorithm = Algorithm.HMAC256(secret);

        return JWT.create()
                .withIssuer("plataforma-api")
                .withSubject(student.getUsername()) // ou student.getEmail(), se preferir
                .withExpiresAt(generateExpirationDate())
                .sign(algorithm);
    } catch (JWTCreationException exception) {
        throw new RuntimeException("Erro ao gerar token JWT", exception);
    }
}

    // Validador de Token
    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            return JWT.require(algorithm)
                    .withIssuer("plataforma-api")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException exception){
            return "";
        }
    }

    // Gera a data de expiração do token (ex: 2 horas a partir de agora)
    private Instant generateExpirationDate() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}