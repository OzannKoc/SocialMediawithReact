package com.SocailMediaApp.ws.PostedContents;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.SocailMediaApp.ws.Shared.GenericResponse;

@RestController
public class ContentController {
	@Autowired
	private ContentService contentService ;
	
	@PostMapping("/api/posts")
	public GenericResponse savePost(@Valid @RequestBody Content content) {
		contentService.save(content);
		return new GenericResponse("content saved");
		
	}
}
