package com.ssafy.benepick.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

/**
 *  접속 : http://localhost:8080/swagger-ui/index.html
 */

@Configuration

public class OpenApiConfig {
	@Bean
	public OpenAPI openApi() {
		Info info = new Info()
			.title("BenePick API Document")
			.version("v0.0.1")
			.description("BenePick API 명세서입니다.");

		return new OpenAPI()
			.components(new Components())
			.info(info);
	}
}
