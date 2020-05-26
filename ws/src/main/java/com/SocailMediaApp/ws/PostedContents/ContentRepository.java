package com.SocailMediaApp.ws.PostedContents;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.SocailMediaApp.ws.User.User;

public interface ContentRepository extends JpaRepository<Content, Long> {

	public Page<Content> findByUser(Pageable page, User user);
	

}
