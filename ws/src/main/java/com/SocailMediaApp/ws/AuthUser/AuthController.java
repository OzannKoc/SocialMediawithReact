package com.SocailMediaApp.ws.AuthUser;

import java.util.Base64;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.SocailMediaApp.ws.Shared.AuthorizedUser;
import com.SocailMediaApp.ws.User.User;
import com.SocailMediaApp.ws.User.UserRepository;
import com.SocailMediaApp.ws.User.DTO.UserDTO;
import com.fasterxml.jackson.annotation.JsonView;

@RestController
public class AuthController {

	@PostMapping("/api/auth")
	public UserDTO handleAuthentication(@AuthorizedUser User user) {

		return new UserDTO(user);
	}

}
