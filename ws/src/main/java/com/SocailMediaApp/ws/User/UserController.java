package com.SocailMediaApp.ws.User;



import java.util.function.Function;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SocailMediaApp.ws.Shared.AuthorizedUser;
import com.SocailMediaApp.ws.Shared.GenericResponse;
import com.SocailMediaApp.ws.User.DTO.UpdatedUserDTO;
import com.SocailMediaApp.ws.User.DTO.UserDTO;


@RestController
@RequestMapping("/api")
public class UserController {
 
	
	@Autowired	
	private UserService userService;
	
		@PostMapping("/users")
 		public GenericResponse UserSignUp(@Valid @RequestBody User user) {
			
			userService.save(user);
			
			return new GenericResponse("User created.");
 			
 		}
		
		@GetMapping("/users")
		public Page<UserDTO> getUsers(Pageable page, @AuthorizedUser User user){
			return userService.getUsers(page,user).map(new Function<User, UserDTO>() {

				@Override
				public UserDTO apply(User user) {
					return new UserDTO(user);
				}
			});
		}
		
		@GetMapping("/users/{username}")
		public UserDTO getUser(@PathVariable String username) {
			User user  = userService.getUser(username);
			
			return new UserDTO(user);
		}
		
		@PutMapping("/users/{username}")
		@PreAuthorize("#username == principal.username")
		public UserDTO updateUser(@Valid @RequestBody UpdatedUserDTO updatedUser, @PathVariable String username) {
			User user = userService.updateUser(username,updatedUser);
				return new UserDTO(user);
			
		}
		
		@DeleteMapping("/users/{username}")
		@PreAuthorize("#username == principal.username")
		public GenericResponse deleteUser(@PathVariable String username) {
			userService.deleteUser(username);
			return new GenericResponse("Account deleted");
		}
		
		
		
		
}
