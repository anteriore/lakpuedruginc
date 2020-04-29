package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.security.Principal;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.auth.LoginRequest;
import com.wyvernlabs.ldicp.spring.events.superadmin.auth.MyUserDetailsService;
import com.wyvernlabs.ldicp.spring.events.superadmin.auth.MyUserPrincipal;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.AccessToken;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UserRepository;

@RestController
public class ApplicationProcessController {
	private final Logger LOGGER = LoggerFactory.getLogger(ApplicationProcessController.class);

	@Autowired
	public ApplicationProcessController() {
	}

	@Value("${app.version}")
	private String appVersion;

	@Autowired
	private MyUserDetailsService userService;

	@PostConstruct
	private void init() {
		LOGGER.info("##### APP VERSION : " + appVersion);
	}

	@Autowired
	private UserRepository userRepository;

	@GetMapping("/rest/me")
	public MyUserPrincipal user(Principal user) {
		UsernamePasswordAuthenticationToken user1 = (UsernamePasswordAuthenticationToken) user;
		return (MyUserPrincipal) user1.getPrincipal();
	}

	/**
	 * Authenticates a user and creates an access token.
	 *
	 * @return The generated access token.
	 */
	@PostMapping("/api/login")
	public AccessToken authenticate(@RequestBody LoginRequest loginRequest) {
		LOGGER.info("authenticate:  " + loginRequest.getUsername());
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
				loginRequest.getUsername(), loginRequest.getPassword());
		SecurityContextHolder.getContext().setAuthentication(authenticationToken);

		MyUserPrincipal principal = (MyUserPrincipal) SecurityContextHolder.getContext().getAuthentication()
				.getPrincipal();

		return this.userService.createAccessToken(userRepository.getOne(principal.getId()));
	}

	@GetMapping("/version")
	public String getVersion() {
		return "{ \"version\": \"" + appVersion + "\"}";
	}
}
