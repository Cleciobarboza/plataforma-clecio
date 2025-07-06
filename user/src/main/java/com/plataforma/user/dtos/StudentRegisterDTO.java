public record StudentRegisterDTO(String user_name, String email, String password) {
    public StudentRegisterDTO {
        if (user_name == null || user_name.isBlank()) {
            throw new IllegalArgumentException("Firstname cannot be null or blank");
        }
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("Email cannot be null or blank");
        }
        if (password == null || password.isBlank()) {
            throw new IllegalArgumentException("Password cannot be null or blank");
        }
    }
}

