package com.SocailMediaApp.ws;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

import com.SocailMediaApp.ws.PostedContents.Content;
import com.SocailMediaApp.ws.PostedContents.ContentService;
import com.SocailMediaApp.ws.PostedContents.DTO.ContentSubmitDTO;
import com.SocailMediaApp.ws.User.User;
import com.SocailMediaApp.ws.User.UserService;

@SpringBootApplication
public class WsApplication {

	public static void main(String[] args) {
		SpringApplication.run(WsApplication.class, args);
	}
	@Bean
	@Profile("social-media-dev")
	public CommandLineRunner createUser (UserService userService,ContentService contentService) {
		return (args) ->{
			for(int i=1 ; i<=25 ;i++) {
				User user = new User();
				user.setUsername("User"+i);
				user.setDisplayName("Seigneur"+i);
				user.setPassword("P4ssword");
				userService.save(user);
				for(int j = 1 ; j<=20 ;j++) {
					ContentSubmitDTO content = new ContentSubmitDTO();
					content.setContent("Acımasız gerçekler - "+j+" from "+user.getDisplayName());
					contentService.save(content,user);
				}
			}
		};
		
	}
}
				
				
				
