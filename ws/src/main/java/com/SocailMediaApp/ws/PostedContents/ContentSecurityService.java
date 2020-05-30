package com.SocailMediaApp.ws.PostedContents;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SocailMediaApp.ws.User.User;

@Service
public class ContentSecurityService {
	@Autowired
	private ContentRepository contentRepository;
	
	public boolean isAllowedToDelete(long id,User isLoggedInUser) {
		Optional<Content> optionalContent = contentRepository.findById(id);
		if(!optionalContent.isPresent()) {
			return false ;
		}
		
		Content content = optionalContent.get();
		if(content.getUser().getId()!=isLoggedInUser.getId()) {
			return false ;
		}
		return true;
	}
}
