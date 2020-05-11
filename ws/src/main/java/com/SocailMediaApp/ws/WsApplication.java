package com.SocailMediaApp.ws;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;

import com.SocailMediaApp.ws.User.User;
import com.SocailMediaApp.ws.User.UserService;

@SpringBootApplication
public class WsApplication {

	public static void main(String[] args) {
		SpringApplication.run(WsApplication.class, args);
	}
	@Bean
	public CommandLineRunner createUser (UserService userService) {
		return (args) ->{
				User user = new User();
				user.setUsername("User");
				user.setDisplayName("Seigneur");
				user.setPassword("P4ssword");
				userService.save(user);
				
				
			};
		
	}
}
