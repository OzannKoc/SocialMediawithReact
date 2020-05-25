package com.SocailMediaApp.ws.PostedContents;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ContentService {
	@Autowired
	private ContentRepository contentRepository;
	
	public void save(Content content) {
		content.setTimeStamp(new Date());
		contentRepository.save(content);
	}

	public Page<Content> getContents(Pageable page) {
		return contentRepository.findAll(page);
	}

}
