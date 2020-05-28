package com.SocailMediaApp.ws.File.DTO;
import com.SocailMediaApp.ws.File.FileAttachment;

import lombok.Data;

@Data
public class FileAttachmentDTO {
	
	private String name ;
	
	private String fileType ;
	
	public FileAttachmentDTO(FileAttachment fileAttachment) {
		this.setName(fileAttachment.getName());
		this.setFileType(fileAttachment.getFileType());
	}
}
