package com.SocailMediaApp.ws.Errors;

import java.util.Date;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiError {
	private int status ;
	private String message ;
	private String path ;
	private Map<String,String> validationErrors ;
	private long timeStamp = new Date().getTime();
	
	public ApiError (int status, String message, String path) {
		this.status = status ;
		this.message = message ;
		this.path = path ;
	}
}
