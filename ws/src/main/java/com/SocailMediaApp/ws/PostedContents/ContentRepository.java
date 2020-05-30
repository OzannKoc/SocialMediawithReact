package com.SocailMediaApp.ws.PostedContents;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.SocailMediaApp.ws.User.User;

public interface ContentRepository extends JpaRepository<Content, Long>,JpaSpecificationExecutor<Content>{

	public Page<Content> findByUser(Pageable page, User user);
	
	
}
