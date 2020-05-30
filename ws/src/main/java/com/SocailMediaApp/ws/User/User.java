package com.SocailMediaApp.ws.User;

import java.util.Collection;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import com.SocailMediaApp.ws.PostedContents.Content;
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
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id ;
	
	@NotNull(message = "{SocialMediaApp.username.constraints.NotNull.message}")
	@Size(min = 4 , max=255)
	@UniqueUsername
	private String username ;
	
	@NotNull(message = "{SocialMediaApp.displayName.constraints.NotNull.message}")
	@Size(min = 4 , max=255)
	private String displayName ;
	
	@NotNull(message = "{SocialMediaApp.password.constraints.NotNull.message}")
	@Size(min = 8 , max=255)
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$",message = "{SocialMediaApp.password.constraints.Pattern.message}")
	private String password ;
	
	@Lob
	private String image ;
	@OneToMany(mappedBy = "user",cascade = CascadeType.REMOVE)
	private List<Content> contentList;

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
