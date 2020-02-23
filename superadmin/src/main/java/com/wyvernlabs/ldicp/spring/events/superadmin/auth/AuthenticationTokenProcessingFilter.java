package com.wyvernlabs.ldicp.spring.events.superadmin.auth;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.User;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Enumeration;

@Component
public class AuthenticationTokenProcessingFilter extends GenericFilterBean {
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationTokenProcessingFilter.class);
    @Autowired
    private MyUserDetailsService userService;

    @Autowired
    @Qualifier("authenticationManager")
    private AuthenticationManager authManager;


    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = this.getAsHttpRequest(request);

        String accessToken = this.extractAccessTokenFromRequest(httpRequest);
        if (null != accessToken && !httpRequest.getRequestURI().contains("rest/login")) {
            User user = this.userService.findUserByAccessToken(accessToken);
//            logger.info("## FILTER AuthenticationTokenProcessingFilter: {} ", (user != null) ? "FOUND " + user.getEmail() : "NOT FOUND");
            if (null != user) {
                UsernamePasswordAuthenticationToken authenticationToken =
//                        new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                        new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
                Authentication authentication = this.authManager.authenticate(authenticationToken);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        chain.doFilter(request, response);
    }

    private HttpServletRequest getAsHttpRequest(ServletRequest request) {
        if (!(request instanceof HttpServletRequest)) {
            throw new RuntimeException("Expecting an HTTP request");
        }

        return (HttpServletRequest) request;
    }

    private String extractAccessTokenFromRequest(HttpServletRequest httpRequest) {
        /* Get token from header */
        /* If token not found get it from request parameter */
        return httpRequest.getParameter("token");
    }
}
