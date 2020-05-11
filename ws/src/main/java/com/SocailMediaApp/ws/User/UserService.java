package com.SocailMediaApp.ws.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository ;
	private PasswordEncoder passwordEncoder;
	
	
	
	public UserService(PasswordEncoder passwordEncoder) {
		
		this.passwordEncoder = passwordEncoder;
	}

	public void save(User user) {
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));
		userRepository.save(user);
		
	}
	
	

}
