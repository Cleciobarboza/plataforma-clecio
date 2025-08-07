package com.plataforma.user;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

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
      
        SpringApplication.run(UserApplication.class, args);
    }
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

}