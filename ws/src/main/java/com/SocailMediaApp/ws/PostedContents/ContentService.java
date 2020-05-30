package com.SocailMediaApp.ws.PostedContents;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;

import com.SocailMediaApp.ws.File.FileAttachment;
import com.SocailMediaApp.ws.File.FileAttachmentRepository;
import com.SocailMediaApp.ws.File.FileService;
import com.SocailMediaApp.ws.PostedContents.DTO.ContentSubmitDTO;
import com.SocailMediaApp.ws.User.User;
import com.SocailMediaApp.ws.User.UserService;

@Service
public class ContentService {
	@Autowired
	private ContentRepository contentRepository;
	@Autowired
	private FileAttachmentRepository fileAttachmentRepository;
	
	@Autowired
	private UserService userService ;
	
	@Autowired
	private FileService fileService ;
	
	public void save(ContentSubmitDTO contentSubmit, User user) {
		Content content = new Content();
		content.setContent(contentSubmit.getContent());
		content.setTimeStamp(new Date());
		content.setUser(user);
		contentRepository.save(content);
		Optional<FileAttachment> optionalFileAttachment = fileAttachmentRepository.findById(contentSubmit.getAttachmentId());
		if(optionalFileAttachment.isPresent()) {
			FileAttachment fileAttachment = optionalFileAttachment.get();
			fileAttachment.setContent(content);
			fileAttachmentRepository.save(fileAttachment);
		}
		
	}

	public Page<Content> getContents(Pageable page) {
		return contentRepository.findAll(page);
	}

	public Page<Content> getContentsofUser(Pageable page,String username) {
		User inDB = userService.getUser(username);
		return contentRepository.findByUser(page,inDB);
	}

	public Page<Content> getOldContents(long id, Pageable page, String username) {
		Specification<Content> specification = lessThan(id);
		if(username!=null) {
			User inDB = userService.getUser(username);
			specification = specification.and(isUser(inDB));
		}
		return contentRepository.findAll(specification, page);
	}

	

	public long getNewContentsCount(long id, String username) {
		
		Specification<Content> specification = greaterThan(id);
		if(username !=null) {
			User inDB = userService.getUser(username);
			specification = specification.and(isUser(inDB));
		}	
		return contentRepository.count(specification);
	}

	

	public List<Content> getNewContents(long id, String username, Sort sort) {
		Specification<Content> specification = greaterThan(id);
		if(username!=null) {
			User inDB = userService.getUser(username);
			specification = specification.and(isUser(inDB));		
		}
		return contentRepository.findAll(specification, sort);
	}
	
	
	
	Specification<Content> lessThan(long id){
		return new Specification<Content>() {

			@Override
			public Predicate toPredicate(Root<Content> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				return criteriaBuilder.lessThan(root.get("id"), id);
			}
		};
		
	}
	Specification<Content> isUser(User user){
		return (root, query, criteriaBuilder) -> {
				return criteriaBuilder.equal(root.get("user"), user);
		};
		
	}
	Specification<Content> greaterThan(long id){
		return (Root<Content> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
				return criteriaBuilder.greaterThan(root.get("id"), id);
		};
		
	}

	public void delete(long id) {
		Content content = contentRepository.getOne(id);
		if(content.getFileAttachment()!=null) {
			String fileName = content.getFileAttachment().getName();
			fileService.deleteUnusedAttachments(fileName);
		}
		contentRepository.deleteById(id);
	}
	
	
	
	
	

}
