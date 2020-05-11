package com.SocailMediaApp.ws.User;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import com.SocailMediaApp.ws.Shared.JsonIncludeCase;
import com.fasterxml.jackson.annotation.JsonView;

import lombok.Data;

@Data
@Entity
public class User implements UserDetails{
	/**
	 * 
	 */
	private static final long serialVersionUID = -3631650939166537567L;

	@Id
	@GeneratedValue
	private long id ;
	
	@NotNull(message = "{SocialMediaApp.username.constraints.NotNull.message}")
	@Size(min = 4 , max=255)
	@UniqueUsername
	@JsonView(JsonIncludeCase.Base.class)
	private String username ;
	
	@NotNull(message = "{SocialMediaApp.displayName.constraints.NotNull.message}")
	@Size(min = 8 , max=255)
	@JsonView(JsonIncludeCase.Base.class)
	private String displayName ;
	
	@NotNull(message = "{SocialMediaApp.password.constraints.NotNull.message}")
	@Size(min = 8 , max=255)
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$",message = "{SocialMediaApp.password.constraints.Pattern.message}")
	@JsonView(JsonIncludeCase.Sensitive.class)
	private String password ;
	
	@JsonView(JsonIncludeCase.Base.class)
	private String image ;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return AuthorityUtils.createAuthorityList("Role_user");
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
}
