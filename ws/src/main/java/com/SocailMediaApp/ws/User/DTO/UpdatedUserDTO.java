package com.SocailMediaApp.ws.User.DTO;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.SocailMediaApp.ws.Shared.FileType;

import lombok.Data;

@Data
public class UpdatedUserDTO {
	
	@NotNull(message = "{SocialMediaApp.displayName.constraints.NotNull.message}")
	@Size(min = 8 , max=255)
	private String displayName ;
	
	@FileType(types = {"jpeg","png"})
	private String image ;

}
