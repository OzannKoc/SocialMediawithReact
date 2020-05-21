package com.SocailMediaApp.ws.Configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
@ConfigurationProperties(prefix = "social-media")
public class AppConfiguration {
		private String uploadPath ;
}
