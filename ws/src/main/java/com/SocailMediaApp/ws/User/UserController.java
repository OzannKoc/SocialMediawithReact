package com.SocailMediaApp.ws.User;


import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.SocailMediaApp.ws.Shared.GenericResponse;


@RestController
public class UserController {
 
	
	@Autowired	
	private UserService UserService;
	
		@PostMapping("/api/users")
 		public GenericResponse UserSignUp(@Valid @RequestBody User user) {
			
			UserService.save(user);
			
			return new GenericResponse("User created.");
 			
 		}
		
		
}
