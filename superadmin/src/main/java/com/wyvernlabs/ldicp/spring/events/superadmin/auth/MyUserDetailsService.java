package com.wyvernlabs.ldicp.spring.events.superadmin.auth;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.AccessToken;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.User;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.AccessTokenRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class MyUserDetailsService implements UserDetailsService {
    private static final Logger logger = LoggerFactory.getLogger(MyUserDetailsService.class.getName());

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AccessTokenRepository accessTokenRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        List<User> users = userRepository.findByEmail(username);
//        logger.info("loadUserByUsername: users.size(): {} username: {}", users.size(), username);
        if (users.size() == 0) {
            throw new UsernameNotFoundException(username);
        }
//        logger.info("loadUserByUsername: " + users.get(0));
        return new MyUserPrincipal(users.get(0));
    }


    public User findUserByAccessToken(String accessTokenString)
    {
        AccessToken accessToken = this.accessTokenRepository.findByToken(accessTokenString);
//        logger.info("findUserByAccessToken: {}, result: {}", accessTokenString, (accessToken == null) ? "NOT FOUND" : "FOUND");
        if (null == accessToken) {
            return null;
        }

        if (accessToken.isExpired()) {
            this.accessTokenRepository.delete(accessToken);
            return null;
        }

        return accessToken.getUser();
    }

    public AccessToken createAccessToken(User user)
    {
        AccessToken accessToken = new AccessToken(user, UUID.randomUUID().toString());
//        logger.info("createAccessToken: {}, result: {}", user.getEmail(), accessToken.getToken());
        return this.accessTokenRepository.save(accessToken);
    }

}

