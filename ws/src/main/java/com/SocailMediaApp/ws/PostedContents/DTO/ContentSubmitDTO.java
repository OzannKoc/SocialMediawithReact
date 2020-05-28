package com.SocailMediaApp.ws.PostedContents.DTO;

import javax.validation.constraints.Size;

import lombok.Data;
@Data
public class ContentSubmitDTO {
	@Size(max = 500 , min = 1)
	private String content;
	
	private long attachmentId ;
}
