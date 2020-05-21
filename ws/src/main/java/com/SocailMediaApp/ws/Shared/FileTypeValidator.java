package com.SocailMediaApp.ws.Shared;

import java.util.Arrays;
import java.util.stream.Collectors;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.hibernate.validator.constraintvalidation.HibernateConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

import com.SocailMediaApp.ws.File.FileService;

public class FileTypeValidator implements ConstraintValidator<FileType, String> {
	
	@Autowired
	FileService fileService ;
	
	String[] fileTypes ;
	
	@Override
	public void initialize(FileType constraintAnnotation) {
		this.fileTypes = constraintAnnotation.types();
	}
	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		
		if(value==null || value.isEmpty() ) {
			return true ;
		}
		String fileType = fileService.detect(value);
		for(String validFileType : fileTypes) {
			if(fileType.contains(validFileType)) {
				return true;
			}
		}
		String supportedTypes = Arrays.stream(this.fileTypes).collect(Collectors.joining(", "));
		context.disableDefaultConstraintViolation();
		HibernateConstraintValidatorContext constraintValidatorContext=context.unwrap(HibernateConstraintValidatorContext.class);
		constraintValidatorContext.addMessageParameter("types", supportedTypes);
		constraintValidatorContext.buildConstraintViolationWithTemplate(context.getDefaultConstraintMessageTemplate()).addConstraintViolation();
		return false;
	}

}
