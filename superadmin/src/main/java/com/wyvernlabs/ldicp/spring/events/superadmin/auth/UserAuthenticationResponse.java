package com.wyvernlabs.ldicp.spring.events.superadmin.auth;

public class UserAuthenticationResponse {
    private final String username;

    public UserAuthenticationResponse(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    @Override
    public String toString() {
        return "UserAuthenticationResponse{" +
                "username='" + username + '\'' +
                '}';
    }
}
