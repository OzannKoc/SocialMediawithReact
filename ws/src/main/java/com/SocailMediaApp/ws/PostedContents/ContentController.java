package com.SocailMediaApp.ws.PostedContents;



import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.SocailMediaApp.ws.PostedContents.DTO.ContentDTO;
import com.SocailMediaApp.ws.PostedContents.DTO.ContentSubmitDTO;
import com.SocailMediaApp.ws.Shared.AuthorizedUser;
import com.SocailMediaApp.ws.Shared.GenericResponse;
import com.SocailMediaApp.ws.User.User;

@RestController
@RequestMapping("/api")
public class ContentController {
	@Autowired
	private ContentService contentService ;
	
	@PostMapping("/posts")
	public GenericResponse savePost(@Valid @RequestBody ContentSubmitDTO contentSubmit,@AuthorizedUser User user) {
		contentService.save(contentSubmit,user);
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
	@GetMapping({"/posts/{id:[0-9]+}","/users/{username}/posts/{id:[0-9]+}"} ) 
	public ResponseEntity<?> getPosts(@PageableDefault(sort = "id",direction = Direction.DESC)Pageable page,
			@PathVariable long id,
			@PathVariable(required = false) String username
			,@RequestParam(name = "count",required = false,defaultValue = "false") Boolean count
			,@RequestParam (name = "direction",defaultValue = "before") String direction) {
		if(count) {
			long countNewContents = contentService.getNewContentsCount(id,username);
			Map<String,Long> response = new HashMap<>();
			response.put("count", countNewContents);
			return ResponseEntity.ok(response);	
		}
		if(direction.equals("after")) {
			List<Content> newContents = contentService.getNewContents(id,username,page.getSort());
			List<ContentDTO> newContentDTO = newContents.stream().map(ContentDTO::new).collect(Collectors.toList());
			return ResponseEntity.ok(newContentDTO);
		}
		return ResponseEntity.ok(contentService.getOldContents(id,page,username).map(ContentDTO::new));
	}
	@DeleteMapping("/posts/{id:[0-9]+}")
	@PreAuthorize("@contentSecurityService.isAllowedToDelete(#id,principal)")
	GenericResponse deleteContent(@PathVariable long id) {
		contentService.delete(id);
		return new GenericResponse("Content deleted.");
	}
	
}
