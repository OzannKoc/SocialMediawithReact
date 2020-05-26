package com.SocailMediaApp.ws.PostedContents;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;

import com.SocailMediaApp.ws.User.User;
import com.SocailMediaApp.ws.User.UserService;

@Service
public class ContentService {
	@Autowired
	private ContentRepository contentRepository;
	
	@Autowired
	private UserService userService ;
	
	public void save(Content content, User user) {
		content.setTimeStamp(new Date());
		content.setUser(user);
		contentRepository.save(content);
	}

	public Page<Content> getContents(Pageable page) {
		return contentRepository.findAll(page);
	}

	public Page<Content> getContentsofUser(Pageable page,String username) {
		User inDB = userService.getUser(username);
		return contentRepository.findByUser(page,inDB);
	}

}
