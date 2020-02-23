package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.AccessToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccessTokenRepository extends JpaRepository<AccessToken, Long> {
    public AccessToken findByToken(String token);
}
