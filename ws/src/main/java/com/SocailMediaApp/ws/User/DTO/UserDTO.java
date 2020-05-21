package com.SocailMediaApp.ws.User.DTO;
import com.SocailMediaApp.ws.User.User;

import lombok.Data;

@Data
public class UserDTO {
	
	private String username ;
	
	private String displayName ;
	
	private String image ;
	
	public UserDTO(User user) {
		this.setUsername(user.getUsername());
		this.setDisplayName(user.getDisplayName());
		this.setImage(user.getImage());
	}
	

}
