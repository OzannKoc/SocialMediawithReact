package com.SocailMediaApp.ws.User;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.SocailMediaApp.ws.User.DTO.UserDTO;

public interface UserRepository extends JpaRepository<User, Long> {

	public User findByUsername(String username);

	public Page<User> findByUsernameNot(Pageable page, String username);
}
