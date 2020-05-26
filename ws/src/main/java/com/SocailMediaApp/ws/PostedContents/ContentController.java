package com.SocailMediaApp.ws.PostedContents;



import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SocailMediaApp.ws.PostedContents.DTO.ContentDTO;
import com.SocailMediaApp.ws.Shared.AuthorizedUser;
import com.SocailMediaApp.ws.Shared.GenericResponse;
import com.SocailMediaApp.ws.User.User;

@RestController
@RequestMapping("/api")
public class ContentController {
	@Autowired
	private ContentService contentService ;
	
	@PostMapping("/posts")
	public GenericResponse savePost(@Valid @RequestBody Content content,@AuthorizedUser User user) {
		contentService.save(content,user);
		return new GenericResponse("content saved");
		
	}
	@GetMapping("/posts")
	public Page<ContentDTO> getPosts(@PageableDefault(sort = "id",direction = Direction.DESC)Pageable page) {
		return contentService.getContents(page).map(ContentDTO::new);
	}
	@GetMapping("/users/{username}/posts")
	public Page<ContentDTO> getPosts( @PathVariable String username, @PageableDefault(sort = "id",direction = Direction.DESC)Pageable page) {
		return contentService.getContentsofUser(page,username).map(ContentDTO::new);
	}
}
