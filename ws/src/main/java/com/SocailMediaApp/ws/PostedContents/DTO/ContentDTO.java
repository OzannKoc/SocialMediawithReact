package com.SocailMediaApp.ws.PostedContents.DTO;


import com.SocailMediaApp.ws.File.DTO.FileAttachmentDTO;
import com.SocailMediaApp.ws.PostedContents.Content;
import com.SocailMediaApp.ws.User.DTO.UserDTO;

import lombok.Data;
@Data
public class ContentDTO {
	
	private long id ;
	
	private String content;
	
	private long timeStamp;
	
	
	private UserDTO user ;
	
	private FileAttachmentDTO fileAttachment;
	
	public ContentDTO(Content content) {
		this.setId(content.getId());
		this.setContent(content.getContent());
		this.setTimeStamp(content.getTimeStamp().getTime());
		this.setUser(new UserDTO(content.getUser()));
		if(content.getFileAttachment() != null) {
			this.fileAttachment = new FileAttachmentDTO(content.getFileAttachment());
		}	
	}

}
