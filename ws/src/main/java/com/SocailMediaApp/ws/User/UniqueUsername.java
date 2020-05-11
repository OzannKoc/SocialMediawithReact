package com.SocailMediaApp.ws.User;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Retention(RUNTIME)
@Target({FIELD})
@Constraint(validatedBy = {UniqueUsernameValidator.class})
public @interface UniqueUsername {
	String message() default "{SocialMediaApp.username.constraints.UniqueUsername.message}";

	Class<?>[] groups() default { };

	Class<? extends Payload>[] payload() default { };
}
