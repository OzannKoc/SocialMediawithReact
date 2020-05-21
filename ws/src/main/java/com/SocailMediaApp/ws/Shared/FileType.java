package com.SocailMediaApp.ws.Shared;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

import com.SocailMediaApp.ws.User.UniqueUsernameValidator;

@Retention(RUNTIME)
@Target({FIELD})
@Constraint(validatedBy = {FileTypeValidator.class})
public @interface FileType {
	String message() default "{SocialMediaApp.username.constraints.FileType.message}";

	Class<?>[] groups() default { };

	Class<? extends Payload>[] payload() default { };
	
	String[] types();

}
