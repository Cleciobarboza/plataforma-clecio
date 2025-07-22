package com.plataforma.user.config.jwt;

import com.plataforma.user.model.StudentModel;

public class LoginResponse {
     private String token;
    private StudentModel user;

    public LoginResponse(String token, StudentModel user) {
        this.token = token;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public StudentModel getUser() {
        return user;
    }
}
    

