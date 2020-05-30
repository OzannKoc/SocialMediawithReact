package com.SocailMediaApp.ws.User;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.SocailMediaApp.ws.Errors.NotFoundExceptions;
import com.SocailMediaApp.ws.File.FileService;
import com.SocailMediaApp.ws.PostedContents.ContentService;
import com.SocailMediaApp.ws.User.DTO.UpdatedUserDTO;
import com.SocailMediaApp.ws.User.DTO.UserDTO;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository ;
	private PasswordEncoder passwordEncoder;
	private FileService fileService ;
	
	
	
	
	public UserService(PasswordEncoder passwordEncoder, FileService fileService) {
		
		this.passwordEncoder = passwordEncoder;
		this.fileService = fileService ;
	}

	public void save(User user) {
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));
		userRepository.save(user);
		
	}



	public Page<User> getUsers(Pageable page, User user) {
		if(user != null) {
			return userRepository.findByUsernameNot(page, user.getUsername());
		}
		return userRepository.findAll(page);
	}

	public User getUser(String username) {
		User inDB = userRepository.findByUsername(username);
		if(inDB==null) {
			throw new NotFoundExceptions();
		}
		return inDB;
	}

	public User updateUser(String username, UpdatedUserDTO updatedUser) {
		User inDB = getUser(username);
		inDB.setDisplayName(updatedUser.getDisplayName());
		if(updatedUser.getImage() !=null) {
			String oldImageName = inDB.getImage();
			try {
				String imageName = fileService.writeStringImageToFile(updatedUser.getImage());
				inDB.setImage(imageName);
			} catch (IOException e) {
				e.printStackTrace();
			}
			fileService.deleteOldImageFile(oldImageName);
		}
		return userRepository.save(inDB);
		
	}

	public void deleteUser(String username) {
		User inDB = userRepository.findByUsername(username);
		fileService.deleteAllStoredFilesOfUser(inDB);
		userRepository.delete(inDB);
		
	}
	
	

}
