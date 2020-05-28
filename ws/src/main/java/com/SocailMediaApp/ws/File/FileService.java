package com.SocailMediaApp.ws.File;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.SocailMediaApp.ws.Configuration.AppConfiguration;

@Service
@EnableScheduling
public class FileService {
	
	@Autowired
	private AppConfiguration appConfiguration;
	@Autowired
	private FileAttachmentRepository fileAttachmentRepository;
	
	private Tika tika ;
	
	public FileService(){
		this.tika = new Tika();	}

	public String writeStringImageToFile(String image) throws IOException {
		String fileName = generateFileName();
		File target = new File (appConfiguration.getProfilePath()+"/"+fileName);
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
		String oldImageFile = appConfiguration.getProfilePath()+"/"+oldImageName;
		deleteFile(Paths.get(oldImageFile));
	}
	public void deleteUnusedAttachments(String attachmentfile) {
		if(attachmentfile==null) {
			return ;
		}
		String oldFile = appConfiguration.getAttachmentPath()+"/"+attachmentfile;
		deleteFile(Paths.get(oldFile));
	}
	public void deleteFile(Path path) {
		try {
			Files.deleteIfExists(path);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public String detect(String value) {
		byte[] byteImageFile = Base64.getDecoder().decode(value);
		
		return tika.detect(byteImageFile);
	}

	public FileAttachment saveAttachmentFile(MultipartFile file) {
		String fileName = generateFileName();
		File target = new File (appConfiguration.getAttachmentPath()+"/"+fileName);
		String fileType = null ;
		try {
			OutputStream outputFile = new FileOutputStream(target);
			outputFile.write(file.getBytes());
			outputFile.close();
			fileType = tika.detect(file.getBytes());
		} catch (IOException e) {
			e.printStackTrace();
		}
		FileAttachment attachment = new FileAttachment();
		attachment.setName(fileName);
		attachment.setDate(new Date());
		attachment.setFileType(fileType);
		return fileAttachmentRepository.save(attachment);
		
	}
	@Scheduled(fixedRate = (24*60*60*1000))
	public void cleanupStorage() {
		Date twentyFourHoursAgo = new Date(System.currentTimeMillis()-(24*60*60*1000));
		List<FileAttachment> filesToBeDeleted=fileAttachmentRepository.findByDateBeforeAndContentIsNull(twentyFourHoursAgo);
		for(FileAttachment file :filesToBeDeleted) {
			deleteUnusedAttachments(file.getName());
			fileAttachmentRepository.deleteById(file.getId());
		}
	}

	
}
