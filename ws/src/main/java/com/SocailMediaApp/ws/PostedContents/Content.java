package com.SocailMediaApp.ws.PostedContents;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.Size;

import lombok.Data;
@Data
@Entity
public class Content {
		@Id
		@GeneratedValue
		private long id ;
		
		@Size(max = 500 , min = 1)
		@Column(length = 500)
		private String content;
		
		private Date timeStamp;
}
