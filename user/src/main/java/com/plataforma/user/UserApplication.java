package com.plataforma.user;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;

@OpenAPIDefinition(
    info = @io.swagger.v3.oas.annotations.info.Info(
        title = "/auth",
        version = "1.0.0",
        description = "API for managing user accounts in the platform"
    )
)
@SpringBootApplication
public class UserApplication {

    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.load(); 

        System.setProperty("POSTGRES_DB", dotenv.get("POSTGRES_DB"));
        System.setProperty("POSTGRES_USER", dotenv.get("POSTGRES_USER"));
        System.setProperty("POSTGRES_PASSWORD", dotenv.get("POSTGRES_PASSWORD"));
        SpringApplication.run(UserApplication.class, args);
    }

}