package com.ssafy.benepick;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching
@SpringBootApplication
public class BenepickApplication {

	public static void main(String[] args) {
		SpringApplication.run(BenepickApplication.class, args);
	}

}
