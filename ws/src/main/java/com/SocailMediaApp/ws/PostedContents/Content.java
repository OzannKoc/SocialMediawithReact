package com.SocailMediaApp.ws.PostedContents;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Size;

import com.SocailMediaApp.ws.User.User;

import lombok.Data;
@Data
@Entity
public class Content {
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private long id ;
		
		@Size(max = 500 , min = 1)
		@Column(length = 500)
		private String content;
		
		private Date timeStamp;
		
		@ManyToOne
		private User user ;
}

