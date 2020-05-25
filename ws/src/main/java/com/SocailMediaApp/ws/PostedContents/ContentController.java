package com.SocailMediaApp.ws.PostedContents;



import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
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
	@GetMapping("/api/posts")
	public Page<Content> getPosts(@PageableDefault(sort = "id",direction = Direction.DESC)Pageable page) {
		return contentService.getContents(page);
	}
}
