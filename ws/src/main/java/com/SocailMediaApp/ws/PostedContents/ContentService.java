package com.SocailMediaApp.ws.PostedContents;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContentService {
	@Autowired
	private ContentRepository contentRepository;
	
	public void save(Content content) {
		content.setTimeStamp(new Date());
		contentRepository.save(content);
	}

}
