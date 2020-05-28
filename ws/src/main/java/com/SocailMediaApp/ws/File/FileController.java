package com.SocailMediaApp.ws.File;

import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class FileController {
	
	@Autowired
	private FileService fileService ;
	@PostMapping("/api/posts/attachment-post")
	public FileAttachment postContentAttachment(MultipartFile file) {
		return fileService.saveAttachmentFile(file);
	}

}
