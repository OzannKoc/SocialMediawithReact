package com.SocailMediaApp.ws.File;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SocailMediaApp.ws.Configuration.AppConfiguration;

@Service
public class FileService {
	
	@Autowired
	private AppConfiguration appConfiguration;

	public String writeStringImageToFile(String image) throws IOException {
		String fileName = generateFileName();
		File target = new File (appConfiguration.getUploadPath()+"/"+fileName);
		OutputStream outputFile = new FileOutputStream(target);
		byte[] byteImageFile = Base64.getDecoder().decode(image);
		outputFile.write(byteImageFile);
		outputFile.close();
		return fileName;
	}
	
	public String generateFileName() {
		return UUID.randomUUID().toString().replaceAll("-","");
	}

	public void deleteOldImageFile(String oldImageName) {
		if(oldImageName==null) {
			return ;
		}
		String oldImageFile = appConfiguration.getUploadPath()+"/"+oldImageName;
		try {
			Files.deleteIfExists(Paths.get(oldImageFile));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	
}
