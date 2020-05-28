package com.SocailMediaApp.ws.Configuration;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.type.TrueFalseType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private UserAuthService userAuthService;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable();
		
		http.httpBasic().authenticationEntryPoint(new AuthenticationEntryPoint() {
			
			@Override
			public void commence(HttpServletRequest request, HttpServletResponse response,
					AuthenticationException authException) throws IOException, ServletException {
				response.sendError(HttpStatus.UNAUTHORIZED.value(),HttpStatus.UNAUTHORIZED.getReasonPhrase());
				
			}
		});
		http.headers().frameOptions().disable();
		http.authorizeRequests().antMatchers(HttpMethod.POST, "/api/auth").authenticated()
		.antMatchers(HttpMethod.PUT, "/api/users/{username}").authenticated()
		.antMatchers(HttpMethod.POST, "/api/posts").authenticated()
		.antMatchers(HttpMethod.POST, "/api/posts/attachment-post").authenticated()
		.and()
		.authorizeRequests().anyRequest().permitAll();
		
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userAuthService).passwordEncoder(getPasswordEncoder());
	}
	@Bean
	public PasswordEncoder getPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
