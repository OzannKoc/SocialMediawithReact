package com.SocailMediaApp.ws.File;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SocailMediaApp.ws.User.User;

public interface FileAttachmentRepository extends JpaRepository<FileAttachment, Long> {
	public List<FileAttachment> findByDateBeforeAndContentIsNull(Date date);
	public List<FileAttachment> findByContentUser(User user);
}
