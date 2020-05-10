package com.wyvernlabs.ldicp.spring.events.superadmin;

import com.wyvernlabs.ldicp.spring.events.superadmin.auth.AuthenticationTokenProcessingFilter;
import com.wyvernlabs.ldicp.spring.events.superadmin.auth.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

@SpringBootApplication
public class ApplicationProcessApplication {

	public static void main(String[] args) {

		SpringApplication.run(ApplicationProcessApplication.class, args);
	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**");
			}
		};
	}

	/**
	 * Start internal H2 server so we can query the DB from IDE
	 *
	 * @return H2 Server instance
	 * @throws SQLException
	 */
	@Bean(initMethod = "start", destroyMethod = "stop")
	public org.h2.tools.Server h2Server() throws SQLException {
		return org.h2.tools.Server.createTcpServer("-tcp", "-tcpAllowOthers", "-tcpPort", "9092");
	}

	@Component("restAuthenticationEntryPoint")
	public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {

		@Override
		public void commence(HttpServletRequest request, HttpServletResponse response,
				AuthenticationException authException) throws IOException {

			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
		}
	}

	@Configuration
	@EnableWebSecurity
	class WebSecurityConfig extends WebSecurityConfigurerAdapter {

		@Autowired
		private MyUserDetailsService userDetailsService;

		@Autowired
		private AuthenticationTokenProcessingFilter authenticationTokenProcessingFilter;

		@Autowired
		private RestAuthenticationEntryPoint restAuthenticationEntryPoint;

		@Override
		protected void configure(HttpSecurity http) throws Exception {
			http.headers().frameOptions().disable();
			http.csrf().disable().addFilterBefore(authenticationTokenProcessingFilter, BasicAuthenticationFilter.class)
					.exceptionHandling().authenticationEntryPoint(restAuthenticationEntryPoint).and()
					.authorizeRequests().antMatchers("/rest/**").fullyAuthenticated().anyRequest().permitAll();
		}

		@Override
		protected void configure(AuthenticationManagerBuilder auth) throws Exception {
			auth.userDetailsService(userDetailsService).passwordEncoder(encoder());
		}

		@Bean(name = BeanIds.AUTHENTICATION_MANAGER)
		@Override
		public AuthenticationManager authenticationManagerBean() throws Exception {
			return super.authenticationManagerBean();
		}

		@Bean
		public PasswordEncoder encoder() {
			return new BCryptPasswordEncoder(11);
		}

	}
}
